import AstalBattery from "gi://AstalBattery";
import { bind } from "astal";

export default function BatteryLevel() {
	const bat = AstalBattery.get_default();

	return (
		<box visible={bind(bat, "isPresent")}>
			<image iconName={bind(bat, "batteryIconName")} />
			<label
				label={bind(bat, "percentage").as(
					(p) => `${Math.floor(p * 100)}%`,
				)}
			/>
		</box>
	);
}
