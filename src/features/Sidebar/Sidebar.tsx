import * as React from "react";
import logo from "@/assets/images/branding.png";
import github from "@/assets/svg/github.svg";
import { GITHUB_URL, VERSION_CODE, VERSION_DATE, VERSION_RELEASE_PAGE } from "@/config";
import { Link } from "react-router-dom";
import TermSelector from "./TermSelector";
import ErrorBoundary from "@/components/utils/ErrorBoundary";
import ThemeToggle from "@/components/utils/ThemeToggle";
import { ROUTE } from "@/routes";
import { FEEDBACK_URL } from "@/config";
import UserDataIE from "./UserDataIE";
import { User } from "./User";

interface Props {
	current?: string;
}

export default function Sidebar(props: Props) {
	const [expand, setExpand] = React.useState<boolean>(window.innerWidth >= 1280);

	window.addEventListener("resize", () => {
		if (window.innerWidth >= 1280 && !expand) {
			setExpand(true);
		} else if (window.innerWidth < 1280 && expand) {
			setExpand(false);
		}
	});

	return (
		<>
			<div className="xl:hidden h-[4rem] w-[4rem] absolute xl:left-auto lg:left-14 md:left-2 sm:left-0 left-0">
				<button
					onClick={() => {
						setExpand((val) => !val);
					}}
					aria-hidden={!expand}
					className={
						(expand
							? "bg-accent-700 hover:bg-accent-600/90 text-white rounded-full "
							: "bg-white hover:bg-gray-200 dark:bg-slate-1000 dark:hover:bg-slate-800 text-black dark:text-white rounded-md ") +
						" hamburger flex-none h-[3rem] w-[3rem] m-2 text-center"
					}
				>
					<span className="material-icons align-middle text-2xl">
						{expand ? "close" : "menu"}
					</span>
				</button>
			</div>
			<div
				aria-expanded={expand}
				className={
					"tw-sidebar-menu text-gray-800" +
					" dark:border-slate-800 dark:text-white dark:bg-slate-1000 overflow-y-auto" +
					" xl:min-h-screen xl:max-h-screen xl:bg-transparent bg-white dark:bg-slate-1000" +
					" border lg:border-t-0 lg:border-b-0 lg:border-l-0 lg:border-r lg:border-gray-300"
				}
			>
				<div className="items-center hidden xl:flex">
					<a
						href="/"
						className="block flex-none hover:border-0 tw-hover-no-underline"
					>
						<div className="flex items-center ml-3 mr-2">
							<img
								src={logo}
								alt="UFV Sidebar Logo"
								className="w-8 md:w-9 xl:w-8"
							/>
							<span className="font-serif font-bold text-gray-800 dark:text-white text-3xl pt-[0.3rem] hidden xl:inline">
								<span className="text-accent-700">o</span>Finder
							</span>
							<span className="pl-1 font-medium text-sm">
								v{VERSION_CODE}
							</span>
						</div>
					</a>

					<div className="flex-1 text-right leading-[0.8rem] mr-4 xl:block hidden">
						<ThemeToggle />
					</div>
				</div>
				<div className="xl:mt-8 mb-4">
					<User />
				</div>
				<div className="my-3">
					<ErrorBoundary fallback={<></>}>
						<TermSelector />
					</ErrorBoundary>
				</div>
				<nav aria-label="Main" className="my-6 px-2 w-full flex-1 z-10 relative">
					<div className="ml-2 flex xl:block text-base pb-2 text-gray-600 dark:text-slate-400">
						<div>Menu</div>
						<div className="flex-1 text-right leading-[0.8rem] mr-2 xl:hidden">
							<ThemeToggle />
						</div>
					</div>
					<Link
						aria-current={
							props.current && props.current === "home" ? "page" : "false"
						}
						className="tw-sidebar-nav-btn tw-hover-no-underline text-black dark:text-white"
						to={ROUTE.Home}
					>
						<span className="ic ic-md ic-menu-home dark:invert inline-block"></span>
						<span>Courses Home</span>
					</Link>
					<Link
						aria-current={
							props.current && props.current === "calendar"
								? "page"
								: "false"
						}
						className="tw-sidebar-nav-btn tw-hover-no-underline text-black dark:text-white"
						to={ROUTE.Calendar}
					>
						<span className="ic ic-md ic-menu-calendar dark:invert inline-block"></span>
						<span>Calendar</span>
					</Link>
					<Link
						aria-current={
							props.current && props.current === "course_browser"
								? "page"
								: "false"
						}
						className="tw-sidebar-nav-btn tw-hover-no-underline text-black dark:text-white"
						to={ROUTE.CourseBrowser}
					>
						<span className="ic ic-md ic-menu-shapes dark:invert inline-block"></span>
						<span>Course Browser</span>
					</Link>
					<Link
						aria-current={
							props.current && props.current === "team" ? "page" : "false"
						}
						className="tw-sidebar-nav-btn tw-hover-no-underline text-black dark:text-white"
						to={ROUTE.About}
					>
						<span className="ic ic-md ic-menu-team dark:invert inline-block"></span>
						<span>Dev Team</span>
					</Link>
					<div className="mt-8 ml-2 text-base pb-2 text-gray-600 dark:text-slate-400">
						Options
					</div>
					<UserDataIE />

					<Link
						aria-current={"false"}
						className={
							"tw-sidebar-nav-btn tw-hover-no-underline hover:bg-orange-700 dark:hover:bg-orange-800" +
							" dark:hover:bg-opacity-20 hover:bg-opacity-20 hover:border-orange-500" +
							" dark:hover:border-orange-900 text-black dark:text-white"
						}
						to={FEEDBACK_URL}
						target="_blank"
						rel="noopener noreferrer"
					>
						<span className="material-icons text-red-600">bug_report</span>
						<span>Report a Bug</span>
					</Link>
				</nav>
				<nav aria-label="Sidebar-Secondary" className="flex-none xl:mb-8">
					<div className="flex mx-2">
						<div className="flex-1 text-sm pr-3">
							Open source. Release: {VERSION_DATE}.{" "}
							<span className="xl:hidden">v{VERSION_CODE}.</span>
							<a
								href={VERSION_RELEASE_PAGE}
								target="_blank"
								rel="noreferrer"
								aria-label="Link to repository"
								className="text-sm block leading-7"
							>
								Check changelog
							</a>
						</div>
						<div className="mt-1 text-center flex-none place-content-center items-baseline flex">
							<a
								href={GITHUB_URL}
								target="_blank"
								rel="noreferrer"
								aria-label="Link to repository"
								className="block mt-1 hover:border-0 tw-hover-no-underline"
							>
								<img
									className="hover:scale-125 transition-transform dark:invert opacity-70"
									src={github}
									alt="GitHub"
								/>
							</a>
						</div>
					</div>
				</nav>
			</div>
		</>
	);
}
