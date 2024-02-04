import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'angular_capacitor_example.krivaneda.app',
	appName: 'Angular Capacitor Example',
	webDir: 'dist/angular-capacitor-example/browser',
	server: {
		androidScheme: 'https',
	},
	plugins: {
		FirebaseAuthentication: {
			skipNativeAuth: false,
			providers: ['google.com'],
		},
	},
};

export default config;
