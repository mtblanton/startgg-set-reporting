import { SetSlot } from "./page";

export function isSetReady({ slots }: { slots?: SetSlot[] | null }): boolean {
	return slots != null && !slots?.some((slot) => slot.entrant == null);
}
