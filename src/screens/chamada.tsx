import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const PRESENCAS_URL = 'https://4a4f-191-52-134-188.ngrok-free.app/presencas';
const ALUNOS_URL = 'https://4a4f-191-52-134-188.ngrok-free.app/alunos';

interface Aluno {
  id: number;
  cpf: string;
  nome: string;
  presente: boolean;
}

interface Presenca {
  data: string;
  alunos: Aluno[];
  id: number;
}

export default function Presencas() {
  const [presencas, setPresencas] = useState<Presenca[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [alunoDados, setAlunoDados] = useState<{ [key: number]: { nome: string; cpf: string } }>({});

  useEffect(() => {
    carregarAlunos();
    listarPresencas();
  }, []);

  const carregarAlunos = async () => {
    try {
      const response = await axios.get(ALUNOS_URL);
      const dadosAlunos = response.data.content.reduce((acc: { [key: number]: { nome: string; cpf: string } }, aluno: { id: number; nome: string; cpf: string }) => {
        acc[aluno.id] = { nome: aluno.nome, cpf: aluno.cpf };
        return acc;
      }, {});
      setAlunoDados(dadosAlunos);
    } catch (error) {
      console.error('Erro ao carregar alunos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados dos alunos.');
    }
  };

  const listarPresencas = async () => {
    setLoading(true);
    try {
      const response = await axios.get(PRESENCAS_URL);
      const presencas = response.data.content;
      
      const presencasFormatada = presencas.map((presenca: Presenca) => {
        return {
          ...presenca,
          alunos: presenca.alunos.map(aluno => ({
            id: aluno.id || 'ID não encontrado',
            nome: aluno.nome || 'Nome não encontrado',
            cpf: aluno.cpf || 'CPF não encontrado',
          })),
        }
      });
      setPresencas(presencasFormatada);
    } catch (error) {
      console.error('Erro ao carregar presenças:', error);
      Alert.alert('Erro', 'Não foi possível carregar as presenças.');
    } finally {
      setLoading(false);
    }
    console.log(presencas);
  };

  const renderItem = ({ item }: { item: Presenca }) => (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => 
        Alert.alert(
          'Alunos Presentes',
          item.alunos
            .map(aluno => `Nome: ${aluno.nome}\nCPF: ${aluno.cpf}`)
            .join('\n\n')
        )}>
        <Text style={styles.cell}>{item.data}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.tableContainer}>
    <Text style={styles.tableTitle}>Lista de datas de presença</Text>
    {loading ? (
      <ActivityIndicator size="large" color="#4CAF50" />
    ) : (
      <FlatList
        data={presencas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
    
      />
    )}
  </View>
  );
}

// Estilos para layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 8,
  },
  tableContainer: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tableTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 12,
  },
  row: {
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cell: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});
