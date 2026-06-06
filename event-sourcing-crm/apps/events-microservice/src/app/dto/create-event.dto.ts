export enum Domain {
  LEAD = "lead",
  CLIENT = "client",
  DEAL = "deal",
  TASK = "task",
  AUTH = "auth",
  NOTE = "note"
}

export enum Action {
  CREATED = "created",
  UPDATED = "updated",
  DELETE = "deleted",
  STATUS_CHANGED = "status_changed"
}

class CreateEventDto {
  domain: Domain;
  action: Action;
  actorId: string;
}

export default CreateEventDto;
