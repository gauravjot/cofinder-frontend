import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
/* CSS */
import "@/assets/css/common.css";
import "@/assets/css/icons.css";
import "@/assets/css/global.css";
/* Redux */
import { Provider } from "react-redux";
/* Cookies */
/* Pages */
import Home from "@/pages/home";
import About from "@/pages/about";
import Courses from "@/pages/courses";
import Calendar from "@/pages/calendar";
import { ROUTE } from "@/routes";
import StartSessionPage from "@/pages/auth/sut/session";
import { reduxStore } from "./redux/store";

/*
 * Redux
 */
// Infer the `RootState` and `AppDispatch` types from the store itself
const store = reduxStore;
export type AppDispatch = typeof store.dispatch;

export default function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path={ROUTE.Home} element={<Home />} />
					<Route path={ROUTE.About} element={<About />} />
					<Route path={ROUTE.Calendar} element={<Calendar />} />
					<Route path={ROUTE.CourseBrowser} element={<Courses />} />
					<Route
						path={ROUTE.CourseBrowserSubjectFilter()}
						element={<Courses />}
					/>
					<Route
						path={ROUTE.CourseBrowserKeywordFilter()}
						element={<Courses />}
					/>
					<Route
						path={ROUTE.DiscordAuthHandling}
						element={<StartSessionPage />}
					/>
				</Routes>
			</Router>
		</Provider>
	);
}
