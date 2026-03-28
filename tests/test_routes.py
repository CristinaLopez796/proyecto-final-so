import os
import mysql.connector
import pytest
from app import app
from config import MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB


@pytest.fixture(autouse=True)
def clean_users_table():
    """Clean users table before each test to avoid duplicate-entry states."""
    conn = mysql.connector.connect(
        host=os.getenv('MYSQL_HOST', MYSQL_HOST),
        user=os.getenv('MYSQL_USER', MYSQL_USER),
        password=os.getenv('MYSQL_PASSWORD', MYSQL_PASSWORD),
        database=os.getenv('MYSQL_DB', MYSQL_DB),
    )
    cursor = conn.cursor()
    cursor.execute('DELETE FROM users;')
    conn.commit()
    cursor.close()
    conn.close()
    yield


def test_get_all_users():
    client = app.test_client()
    res = client.get("/users")
    assert res.status_code == 200

def test_get_user():
    client = app.test_client()
    res = client.get("/users/1")
    assert res.status_code == 200

def test_post_user():
    client = app.test_client()
    res = client.post("/users", json={"name": "Pepe", "email": "pepe@test.com"})
    assert res.status_code == 201

def test_update_user():
    client = app.test_client()
    res = client.put("/users/1", json={"name": "Nuevo", "email": "nuevo@test.com"})
    assert res.status_code == 200

def test_delete_user():
    client = app.test_client()
    res = client.delete("/users/1")
    assert res.status_code == 200
