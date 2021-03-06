// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: true,
	fileController: 'https://localhost:5001/zifile',
	authController: 'https://localhost:6001/appuser',
	planController: 'https://localhost:6001/plans',
	statisticsController: 'https://localhost:7001/Statistics',
	noteController: 'https://localhost:9001/Note',
	addPlanEndpoint: 'addDataPlan',
	removePlanEndpoint: 'removeDataPlan',
	incrementUserCountEndpoint: 'incrementUserCount',
	decrementUserCountEndpoint: 'decrementUserCount',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
