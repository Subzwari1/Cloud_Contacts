from unittest.mock import MagicMock, patch
from data.models import Contact
from fastapi.testclient import TestClient
from routers.contacts import get_db
from main import app


client = TestClient(app)


def test_create_contact(mock_db_session):
    url="/contacts"
    contact={"first_name":"Giovanni",
             "last_name":"Rossi",
             "email":"giovanni@gmail.com",
             "phone_number":"1234567890" ,
             "user_id":1
             }

    response = client.post(url, json=contact)

    assert response.status_code == 201
    data = response.json()
    assert data["first_name"] == "Giovanni"
    assert data["last_name"] == "Rossi"
    assert data["phone_number"] == "1234567890"
    assert data["email"] == "giovanni@gmail.com"


    mock_db_session.add.assert_called_once()
    mock_db_session.commit.assert_called_once()
    mock_db_session.refresh.assert_called_once()

def test_create_without_user_id(mock_db_session):
    url="/contacts"
    contact={"first_name":"Giovanni",
             "last_name":"Rossi",
             "email":"giovanni@gmail.com",
             "phone_number":"1234567890" ,
             }

    response = client.post(url, json=contact)
    assert response.status_code == 422

def test_create_without_phone_number(mock_db_session):
    url="/contacts"
    contact={"first_name":"Giovanni",
             "last_name":"Rossi",
             "email":"giovanni@gmail.com",
             "user_id":1
             }

    response = client.post(url, json=contact)
    assert response.status_code == 422



   


