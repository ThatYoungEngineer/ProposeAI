import apiClient from "./client";
import { endPoints } from "./endPoints";

const addProposal = (proposal) => {
  return apiClient.post(endPoints.projects, proposal);
};

const getProposal = (proposal) => {
  return apiClient.get(endPoints.proposals, proposal);
};

export default {
  addProposal,
  getProposal,
};
