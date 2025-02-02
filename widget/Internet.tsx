import AstalNetwork from "gi://AstalNetwork?version=0.1";
import { bind } from "astal";

export default function Wifi() {
	const network = AstalNetwork.get_default();
	const wifi = bind(network, "wifi");

	return (
		<box visible={wifi.as(Boolean)}>
			{wifi.as(
				(wifi) =>
					wifi && (
						<image
							tooltipText={bind(wifi, "ssid").as(String)}
							iconName={bind(wifi, "iconName")}
						/>
					),
			)}
		</box>
	);
}
