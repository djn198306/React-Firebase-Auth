export function getFirstNameFromFullName(fullName) {
	const firstName = fullName?.split(' ').slice(0, -1).join(' ');

	return firstName;
}

export function getLastNameFromFullName(fullName) {
	const lastName = fullName?.split(' ').slice(1).join(' ');

	return lastName;
}
