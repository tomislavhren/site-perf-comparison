import React from 'react';
import PageTiming from './components/PageTiming';
import TestForm from './components/TestForm';
import rocketImg from './assets/rocket.svg';
import unknownImg from './assets/unknown-server.svg';

const App = () => {
	const [performance, setPerformance] = React.useState({
		cloned: null,
		original: null,
	});

	const handleSuccess = React.useCallback(
		(original, cloned) => {
			setPerformance({
				cloned,
				original,
			});
		},
		[setPerformance]
	);

	const handleStart = React.useCallback(() => {
		setPerformance({
			cloned: null,
			original: null,
		});
	}, [setPerformance]);

	return (
		<div className="App">
			<section
				className="section section--test-form"
				style={{ backgroundColor: '#e9f6f9' }}
			>
				<div className="spacing spacing--l spacing--b-none">
					<div className="cnt align align--center">
						<h1 className="title title--l color color--black-pearl distance distance--xs">
							Test Drive Your Site on Rocket.net
						</h1>
						<div className="paragraph paragraph--l distance distance--m">
							<p>
								Compare how your site performs right now vs how it would perform
								on the Rocket.net platform,
								<br />
								just enter the site URL and go!
							</p>
						</div>
						<TestForm onSuccess={handleSuccess} onStart={handleStart} />
					</div>
				</div>
			</section>

			<div className="section section--test-cards">
				<div className="spacing spacing--l spacing--t-none">
					<div className="cnt align align--center">
						<div className="test test--component">
							<div className="test__cards">
								<div className="row">
									<PageTiming
										serverName="Rocket.net"
										serverLocation="Dallas, Texas, USA"
										serverImgSrc={rocketImg}
										data={performance.cloned}
										isRocket={true}
										gtmetrixLinkLabel="Check Rocket.net score on GTMetrix"
									/>
									<PageTiming
										serverImgSrc={unknownImg}
										data={performance.original}
										gtmetrixLinkLabel="Check origin score on GTMetrix"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
