from unittest.mock import MagicMock
from fastapi.testclient import TestClient
from data.models import User
from routers.users import get_db
from main import app

client = TestClient(app)

def test_login_correct_username_password():

    url="/users/login"
    user={"username":"Giovanni",
          "password":"Rossi"}
    
    mock_db_session = MagicMock()
    mock_query = MagicMock()
    
    mock_query.filter.return_value.first.return_value = User( id= 2 ,username= "Giovanni",password= "Rossi")
    mock_db_session.query.return_value = mock_query

    app.dependency_overrides[get_db] = lambda:mock_db_session
    response = client.post(url, json=user)
    assert response.status_code == 200
    assert response.json() == 2

def test_login_incorrect_username_password():

    url="/users/login"
    user={"username":"Giovanni",
          "password":"Rossi"}
    
    mock_db_session = MagicMock()
    mock_query = MagicMock()
    
    mock_query.filter.return_value.first.return_value = None
    mock_db_session.query.return_value = mock_query

    app.dependency_overrides[get_db] = lambda:mock_db_session
    response = client.post(url, json=user)
    assert response.status_code == 401
    response_json = response.json()
    assert "detail" in response_json
    assert response_json["detail"] == "Username or password incorrect"

 


   


