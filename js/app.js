// Definindo as constantes de endpoint conforme utilizadas na atividade da sua amiga
const API_POST_URL = 'http://cnms-parking-api.net.uztec.com.br/api/v1/entry';
const API_GET_URL = 'http://cnms-parking-api.net.uztec.com.br/api/v1/time';
const API_EXIT_URL = 'http://cnms-parking-api.net.uztec.com.br/api/v1/exit';
const API_CHECK_URL = 'http://cnms-parking-api.net.uztec.com.br/api/v1/check';
const API_UPDATE_URL = 'http://cnms-parking-api.net.uztec.com.br/api/v1/update';
const API_CANCEL_URL = 'http://cnms-parking-api.net.uztec.com.br/api/v1/cancel';

// Função para registrar a entrada do veículo (POST)
document.getElementById('entry-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const plate = document.getElementById('plate-entry').value.trim();
  const resultDiv = document.getElementById('entry-result');
  try {
    const response = await fetch(API_POST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plate })
    });
    const data = await response.json();
    resultDiv.textContent = JSON.stringify(data, null, 4);
  } catch (error) {
    resultDiv.textContent = "Erro: " + error.message;
  }
});

// Função para registrar a saída do veículo (PATCH)
document.getElementById('exit-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const plate = document.getElementById('plate-exit').value.trim();
  const resultDiv = document.getElementById('exit-result');
  try {
    const response = await fetch(`${API_EXIT_URL}/${plate}`, {
      method: 'PATCH'
    });
    const data = await response.json();
    resultDiv.textContent = JSON.stringify(data, null, 4);
  } catch (error) {
    resultDiv.textContent = "Erro: " + error.message;
  }
});

// Função para verificar se o veículo está no estacionamento (GET)
document.getElementById('check-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const plate = document.getElementById('plate-check').value.trim();
  const resultDiv = document.getElementById('check-result');
  try {
    const response = await fetch(`${API_CHECK_URL}/${plate}`);
    const data = await response.json();
    resultDiv.textContent = JSON.stringify(data, null, 4);
  } catch (error) {
    resultDiv.textContent = "Erro: " + error.message;
  }
});

// Função para cancelar o registro de um veículo (DELETE)
document.getElementById('cancel-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const plate = document.getElementById('plate-cancel').value.trim();
  const resultDiv = document.getElementById('cancel-result');
  try {
    const response = await fetch(`${API_CANCEL_URL}/${plate}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    resultDiv.textContent = JSON.stringify(data, null, 4);
  } catch (error) {
    resultDiv.textContent = "Erro: " + error.message;
  }
});

// Função para consultar o tempo de permanência do veículo (GET)
document.getElementById('time-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const plate = document.getElementById('plate-time').value.trim();
  const resultDiv = document.getElementById('time-result');
  try {
    const response = await fetch(`${API_GET_URL}/${plate}`);
    const data = await response.json();
    resultDiv.textContent = JSON.stringify(data, null, 4);
  } catch (error) {
    resultDiv.textContent = "Erro: " + error.message;
  }
});

// Função para atualizar os dados do veículo (PUT)
document.getElementById('update-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const plate = document.getElementById('plate-update').value.trim();
  const newDataText = document.getElementById('new-data').value.trim();
  const resultDiv = document.getElementById('update-result');
  
  let newData;
  try {
    newData = JSON.parse(newDataText);
  } catch (error) {
    resultDiv.textContent = "Erro no JSON: " + error.message;
    return;
  }
  
  try {
    const response = await fetch(`${API_UPDATE_URL}/${plate}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData)
    });
    const data = await response.json();
    resultDiv.textContent = JSON.stringify(data, null, 4);
  } catch (error) {
    resultDiv.textContent = "Erro: " + error.message;
  }
});