import { Set } from "./page";

export enum ActivityState {
	// # Activity is created
	CREATED = 1,
	// # Activity is active or in progress
	ACTIVE = 2,
	// # Activity is done
	COMPLETED = 3,
	// # Activity is ready to be started
	READY = 4,
	// # Activity is invalid
	INVALID = 5,
	// # Activity, like a set, has been called to start
	CALLED = 6,
	// # Activity is queued to run
	QUEUED = 7,
}

const validStates = [
	ActivityState.ACTIVE,
	ActivityState.CALLED,
	ActivityState.QUEUED,
	ActivityState.READY,
	ActivityState.CREATED,
];

export function isValidActivityState(state?: ActivityState | null) {
	return state != null && validStates.includes(state);
}

const stateOrder = [
	ActivityState.ACTIVE,
	ActivityState.CALLED,
	ActivityState.QUEUED,
	ActivityState.READY,
	ActivityState.CREATED,
	ActivityState.COMPLETED,
	ActivityState.INVALID,
];

export function sortSetsByActivityState(a: Set, b: Set) {
	return stateOrder.indexOf(a.state) - stateOrder.indexOf(b.state);
}
