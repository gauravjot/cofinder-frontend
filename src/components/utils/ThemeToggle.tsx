import { useDocTheme } from "use-doc-theme";

export default function ThemeToggle() {
	const theme = useDocTheme();
	return (
		<div className="darkmode-toggle" onClick={theme.toggle}>
			<button>
				<span className="ic-xs ic-menu-moon dark:invert dm-moon-icon"></span>
				<span className="ic-xs ic-menu-sun dm-sun-icon"></span>
			</button>
		</div>
	);
}
