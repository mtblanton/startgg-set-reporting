import { SetSlot } from "./page";

export function isSetReady({ slots }: { slots: SetSlot[] }): boolean {
	return !slots.some((slot) => slot.entrant == null);
}
