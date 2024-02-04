export type LoginUserInput = {
	email: string;
	password: string;
};

export type RegisterUserInput = LoginUserInput & {
	passwordRepeat: string;
};

export const TEST_USER_EMAIL = 'test123@test.sk';
export const TEST_USER_PASSWORD = 'qwer1234';
