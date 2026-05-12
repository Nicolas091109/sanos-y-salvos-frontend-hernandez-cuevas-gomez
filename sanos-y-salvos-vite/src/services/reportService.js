import { mockReports } from '../mock/mockData'

export async function listReports(params = {}) {
  // Simular retraso de red opcional
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockReports), 300);
  });
}

export async function getReport(id) {
  return new Promise((resolve) => {
    const report = mockReports.find(r => String(r.id) === String(id));
    setTimeout(() => resolve(report), 300);
  });
}

export async function createReport(payload) {
  return new Promise((resolve) => {
    const newReport = { ...payload, id: `r_${Date.now()}` };
    setTimeout(() => resolve(newReport), 300);
  });
}

export async function updateReport(id, payload) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...payload, id }), 300);
  });
}

export async function deleteReport(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 300);
  });
}
