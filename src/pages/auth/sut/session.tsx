import Spinner from "@/components/ui/Spinner";
import { themeApply } from "@/components/utils/ThemeApply";
import logo from "@/assets/images/branding.png";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import React from "react";
import { useStartSession } from "@/services/auth/start_session";
import { queryFetchUserInfo } from "@/services/user/fetch_info";
import { ROUTE } from "@/routes";
import { useAppSelector } from "@/redux/hooks";
import { selectAllSchedules } from "@/redux/schedules/scheduleSlice";
import { isEqual } from "lodash";
import { selectAllTerms } from "@/redux/terms/termSlice";

export default function StartSessionPage() {
	const navigate = useNavigate();
	const [scheduleDiff, setScheduleDiff] = React.useState<boolean>(false);
	const [localSchedule, setLocalSchedule] = React.useState<{
		[key: string]: string[];
	}>();
	let token = useParams().token || "";
	let startSession = useStartSession(token);
	let userInfo = queryFetchUserInfo(startSession.token);
	const scheduleLocal = useAppSelector(selectAllSchedules);
	const terms = useAppSelector(selectAllTerms);

	React.useEffect(() => {
		if (userInfo.isSuccess && userInfo.data !== null) {
			// Compare Schedules
			let dict: { [key: string]: string[] } = {};
			for (let i = 0; i < scheduleLocal.length; i++) {
				if (scheduleLocal[i].term in dict) {
					dict[scheduleLocal[i].term].push(scheduleLocal[i].section.toString());
				} else {
					dict[scheduleLocal[i].term] = new Array(
						scheduleLocal[i].section.toString()
					);
				}
			}
			let isSchDifferent = !isEqual(JSON.parse(userInfo.data.schedule), dict);
			setScheduleDiff(isSchDifferent);
			setLocalSchedule(dict);

			if (!isSchDifferent) {
				const timer = setTimeout(() => {
					navigate(ROUTE.Home);
				}, 1250);
				return () => clearTimeout(timer);
			}
		}
	}, [userInfo, scheduleLocal]);

	function getTermFromID(term_id: string) {
		return terms.terms.filter((t) => t.id === term_id)[0];
	}

	themeApply();

	return (
		<>
			<Helmet>
				<title>Authenticating with CoFinder</title>
			</Helmet>
			<div className="h-screen bg-gray-200 dark:bg-slate-900 flex place-items-center place-content-center relative">
				<div className="fog-up absolute inset-0 z-5 opacity-20 invert dark:invert-0"></div>
				<div className="dark:bg-slate-800/60 backdrop-blur-sm bg-white/50 rounded-md shadow-xl w-[32rem] max-w-[96%] px-8 py-6 relative z-10">
					<div className="flex items-center my-4">
						<img
							src={logo}
							alt="UFV Sidebar Logo"
							className="w-8 md:w-9 xl:w-8"
						/>
						<span className="font-serif font-bold text-gray-800 dark:text-white text-3xl pt-[0.3rem] hidden xl:inline">
							<span className="text-accent-700">o</span>Finder
						</span>
					</div>
					<h3 className="mt-6 mb-4 font-black">Starting session</h3>
					<p className="dark:text-slate-400">
						Please wait while we log you in. It usually take couple of
						seconds.
					</p>
					<div className="text-center mt-6">
						<Spinner />
					</div>
				</div>
				{scheduleDiff && (
					<div className="absolute h-screen w-screen flex place-content-center place-items-center">
						<div className="w-[36rem] max-w-[96%] h-max ml-auto mr-auto dark:bg-slate-800 bg-white rounded-md shadow-xl px-8 py-6 relative z-20">
							<h3 className="mt-6 mb-4 font-black">
								Schedule Changes Detected
							</h3>
							<p className="dark:text-slate-400">
								There seems to be some difference between schedule saved
								in your account and the schedule you made earlier.
							</p>
							<p className="dark:text-slate-400 mt-3">
								Choose which one to keep.
							</p>
							<div className="grid grid-cols-2">
								<button>Keep Local</button>
								<button>Keep Cloud</button>
							</div>
							<div className="grid grid-cols-2">
								<div className="col-span-1">
									<h6 className="mb-4 mt-6 font-bold text-lg">Local</h6>
									{localSchedule &&
										Object.keys(localSchedule).map((term_id) => {
											return (
												<div>
													<div className="mt-4 mr-2 border-b text-sm">
														{getTermFromID(term_id).name}
													</div>
													<ul className="ml-4 mt-1 font-mono">
														{localSchedule[term_id].map(
															(section) => {
																return (
																	<li className="py-0.5">
																		{section}
																	</li>
																);
															}
														)}
													</ul>
												</div>
											);
										})}
								</div>
								<div className="col-span-1">
									<h6 className="mb-4 mt-6 font-bold text-lg">Cloud</h6>
									{userInfo.isSuccess && userInfo.data !== null ? (
										Object.keys(
											JSON.parse(userInfo.data.schedule)
										).map((term_id) => {
											return (
												<div>
													<div className="mt-4 mr-2 border-b text-sm">
														{getTermFromID(term_id).name}
													</div>
													<ul className="ml-4 mt-1 font-mono">
														{JSON.parse(
															userInfo.data?.schedule
														)[term_id].map((section: any) => {
															return (
																<li className="py-0.5">
																	{section}
																</li>
															);
														})}
													</ul>
												</div>
											);
										})
									) : (
										<></>
									)}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
