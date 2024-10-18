import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { RepertorioDAO } from '../../dao/RepertorioDAO';

export const Repertorio: React.FC = () => {

	const [loading,setLoading] = useState(true);
	const [repertorios, setRepertorios] = useState<Repertorio[]>([]);

	async function initialLoading(){
		setLoading(true);
		const repertorios_ = await RepertorioDAO.listar();	
		setRepertorios(repertorios_);
		setLoading(false);
	}

	useEffect(() => {
		initialLoading();
	},[]);

	return (
		<View>

		</View>
	);
};