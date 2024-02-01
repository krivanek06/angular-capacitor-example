export type LoginUserInput = {
	email: string;
	password: string;
};

export type RegisterUserInput = LoginUserInput & {
	passwordRepeat: string;
};

export const TEST_USER_EMAIL = '';
export const TEST_USER_PASSWORD = '';
