import axios from 'axios';

const URL = 'http://corona-server.azurewebsites.net';

async function addSoldierToArrivalQueue(soldierId) {
  return await axios.post(`${URL}/addSoliderToArrivalQueue`, {soldierId});
}

async function addSoldier(soldierId, q1, q2, q3) {
  return await axios.post(`${URL}/addSoldierToSoldierTable`, {
    soldierId: soldierId,
    q1: q1,
    q2: q2,
    q3: q3,
  });
}

async function getTopSoldiers() {
  return await axios.get(`${URL}/getResultGetTopSoldiers`);
}

async function sendSoldierToStage(stageId) {
  return await axios.post(`${URL}/dedicateSoldierToStage`, {stageId});
}

async function getStages() {
  return await axios.get(`${URL}/GetStageDedicatedSoldiers`);
}

async function getAllCountdowns() {
  return await axios.get(`${URL}/GetAllCountdowns`);
}

async function updateSoldierVaccinated(soldierId) {
  return await axios.post(`${URL}/${soldierId}/wasVaccinated`);
}

async function updateSoldierVaccinable(soldierId) {
  return await axios.put(`${URL}/${soldierId}/vaccination_ability`, {
    isAbleToVaccinate: true,
  });
}

export {
  addSoldier,
  addSoldierToArrivalQueue,
  getAllCountdowns,
  getStages,
  getTopSoldiers,
  sendSoldierToStage,
  updateSoldierVaccinable,
  updateSoldierVaccinated,
};
