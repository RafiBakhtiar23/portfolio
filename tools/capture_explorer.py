#!/usr/bin/env python3
"""Records REAL requests and responses from your running Task API for the portfolio's API Explorer.

How to use (about 2 minutes):
  1. In the go-task-api folder, delete app.db (so the database is fresh), then start it:
         export JWT_SECRET="any-long-secret"
         go run .
  2. In this portfolio folder, in another terminal:
         python3 tools/capture_explorer.py
  3. The result is public/projects/task-api-explorer.json. Rebuild the site and the section "Real requests, real
     responses" appears on the Task API page. Nothing is made up: every status and body is what the server returned.

Only the Python standard library is used. The demo account is fake (rafi.demo@example.com).
Tokens are shortened in the saved file. Other optional settings: API_URL=http://localhost:8080
"""
import datetime
import json
import os
import pathlib
import sys
import urllib.error
import urllib.request

BASE = os.environ.get("API_URL", "http://localhost:8080").rstrip("/")
OUT = pathlib.Path(__file__).resolve().parent.parent / "public" / "projects" / "task-api-explorer.json"
EMAIL, PASSWORD = "rafi.demo@example.com", "rahasia123"


def call(method, path, body=None, token=None):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(BASE + path, data=data, method=method)
    if body is not None:
        req.add_header("Content-Type", "application/json")
    if token:
        req.add_header("Authorization", "Bearer " + token)
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            status, raw = r.status, r.read().decode()
    except urllib.error.HTTPError as e:
        status, raw = e.code, e.read().decode()
    except urllib.error.URLError as e:
        sys.exit(f"Cannot reach {BASE} ({e.reason}). Is the API running? Start it with: go run .")
    try:
        parsed = json.loads(raw) if raw else None
    except ValueError:
        parsed = raw
    return status, parsed


def shorten(value, token):
    """Replace the full token with a short form inside any JSON value."""
    if not token:
        return value
    short = token[:18] + "…"
    if isinstance(value, str):
        return value.replace(token, short)
    if isinstance(value, dict):
        return {k: shorten(v, token) for k, v in value.items()}
    if isinstance(value, list):
        return [shorten(v, token) for v in value]
    return value


steps, state = [], {"token": None}


def record(title_en, title_id, method, path, body=None, auth=False, expect=None):
    token = state["token"] if auth else None
    status, resp = call(method, path, body, token)
    if expect is not None and status != expect:
        sys.exit(f"Step '{title_en}' returned {status}, expected {expect}.\n"
                 f"Response: {resp}\nDelete app.db, restart the API, and run this script again.")
    headers = {}
    if body is not None:
        headers["Content-Type"] = "application/json"
    if auth:
        headers["Authorization"] = "Bearer " + token[:18] + "…"
    steps.append({
        "title": {"en": title_en, "id": title_id},
        "method": method, "path": path,
        "requestHeaders": headers,
        "requestBody": body,
        "status": status,
        "responseBody": shorten(resp, state["token"]),
    })
    return resp


record("Check that the server is up", "Memeriksa server berjalan", "GET", "/health", expect=200)
record("Create an account", "Membuat akun", "POST", "/api/auth/register",
       {"name": "Rafi", "email": EMAIL, "password": PASSWORD}, expect=201)
record("Same email again is rejected", "Email yang sama ditolak", "POST", "/api/auth/register",
       {"name": "Rafi", "email": EMAIL, "password": PASSWORD}, expect=409)
record("Invalid input is rejected", "Input tidak valid ditolak", "POST", "/api/auth/register",
       {"name": "Rafi", "email": "not-an-email", "password": "123"}, expect=400)
login = record("Log in and receive a JWT", "Login dan menerima JWT", "POST", "/api/auth/login",
               {"email": EMAIL, "password": PASSWORD}, expect=200)
state["token"] = login["token"]
# The login step was recorded before the token was known, so shorten it now.
steps[-1]["responseBody"] = shorten(steps[-1]["responseBody"], state["token"])
record("A wrong password gives 401", "Password salah menghasilkan 401", "POST", "/api/auth/login",
       {"email": EMAIL, "password": "salah-total"}, expect=401)
record("Profile of the logged-in user", "Profil pengguna yang login", "GET", "/api/me", auth=True, expect=200)
record("No token, no access", "Tanpa token, tidak ada akses", "GET", "/api/tasks", expect=401)
t1 = record("Create a task", "Membuat task", "POST", "/api/tasks",
            {"title": "Belajar goroutine", "description": "Baca dokumentasi dan buat contoh"}, auth=True, expect=201)
t2 = record("Create a second task", "Membuat task kedua", "POST", "/api/tasks",
            {"title": "Menulis tes untuk handler"}, auth=True, expect=201)
id1, id2 = t1["data"]["id"], t2["data"]["id"]
record("List tasks with pagination", "Daftar task dengan pagination", "GET", "/api/tasks?page=1&limit=10", auth=True, expect=200)
record("Update only one field", "Mengubah satu field saja", "PUT", f"/api/tasks/{id1}", {"done": True}, auth=True, expect=200)
record("Filter by done", "Filter berdasarkan done", "GET", "/api/tasks?done=true", auth=True, expect=200)
record("A task that does not exist", "Task yang tidak ada", "GET", "/api/tasks/9999", auth=True, expect=404)
record("Delete a task", "Menghapus task", "DELETE", f"/api/tasks/{id2}", auth=True, expect=200)

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps({
    "capturedAt": datetime.date.today().isoformat(),
    "baseUrl": "http://localhost:8080",
    "steps": steps,
}, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"Saved {len(steps)} real requests to {OUT}")
