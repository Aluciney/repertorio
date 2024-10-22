import { showMessage } from 'react-native-flash-message';

export const ShowAlert = {
	showErrorRequest: (error: any) => {
		let message = 'Tivemos um problema. Tente novamente.';
		if (error.response) {
			if (error.response.data.error) {
				message = error.response.data.error;
			}
		} else if (error.request) {
			message = 'Tempo de espera atingido. Por favor, tente novamente.';
		} else {
			message = error.message;
		}
		showMessage({ message, type: 'danger', position: error?.position });
	},
	showSuccessRequest: (success: any) => {
		let message = 'Operação realizada com sucesso';
		if (success.message) {
			message = success.message;
		}
		showMessage({ message, type: 'success', position: success?.position });
	}
};