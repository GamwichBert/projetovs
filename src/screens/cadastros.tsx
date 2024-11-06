import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';

// URL da API para os alunos
const API_URL = 'https://4a4f-191-52-134-188.ngrok-free.app/alunos';

interface Aluno {
  id: number;
  nome: string;
  cpf: string;
}

export default function App() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [novoAluno, setNovoAluno] = useState({ nome: '', cpf: '' });
  const [editandoAluno, setEditandoAluno] = useState<Aluno | null>(null);

  useEffect(() => {
    listarAlunos();
  }, []);

  const listarAlunos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setAlunos(response.data.content);
    } catch (error) {
      console.error('Erro ao carregar alunos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os alunos.');
    } finally {
      setLoading(false);
    }
  };

  const adicionarAluno = async () => {
    if (!novoAluno.nome || !novoAluno.cpf) {
      Alert.alert('Erro', 'Nome e CPF são obrigatórios');
      return;
    }
    try {
      await axios.post(API_URL, novoAluno);
      listarAlunos();
      Alert.alert('Sucesso', 'Aluno adicionado com sucesso');
      setNovoAluno({ nome: '', cpf: '' });
    } catch (error) {
      console.error('Erro ao adicionar aluno:', error);
      Alert.alert('Erro', 'Não foi possível adicionar o aluno');
    }
  };

  const editarAluno = async () => {
    if (!editandoAluno || !editandoAluno.nome || !editandoAluno.cpf) {
      Alert.alert('Erro', 'Nome e CPF são obrigatórios');
      return;
    }
    try {
      await axios.put(`${API_URL}/${editandoAluno.id}`, {
        nome: editandoAluno.nome,
        cpf: editandoAluno.cpf,
      });
      listarAlunos();
      Alert.alert('Sucesso', 'Aluno editado com sucesso');
      setEditandoAluno(null);
    } catch (error) {
      console.error('Erro ao editar aluno:', error);
      Alert.alert('Erro', 'Não foi possível editar o aluno');
    }
  };

  const excluirAluno = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      listarAlunos();
      Alert.alert('Sucesso', 'Aluno excluído com sucesso');
    } catch (error) {
      console.error('Erro ao excluir aluno:', error);
      Alert.alert('Erro', 'Não foi possível excluir o aluno');
    }
  };

  const renderItem = ({ item }: { item: Aluno }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.cpf}</Text>
      <Text style={styles.cell}>{item.nome}</Text>

      <TouchableOpacity style={styles.buttonEdit} onPress={() => setEditandoAluno(item)}>
        <Feather name="edit" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonDelete} onPress={() => excluirAluno(item.id)}>
        <Feather name="trash-2" size={20} color="white" />
      </TouchableOpacity>
      
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>Lista de Alunos</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" />
        ) : (
          <FlatList
            data={alunos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            ListHeaderComponent={
              <View style={styles.headerRow}>
                <Text style={[styles.cell, styles.header]}>CPF</Text>
                <Text style={[styles.cell, styles.header]}>Nome</Text>
                <Text style={[styles.cell, styles.header]}>Ações</Text>
              </View>
            }
          />
        )}
      </View>

      <View style={styles.form}>
        <Text style={styles.title}>{editandoAluno ? 'Editar Aluno' : 'Novo Aluno'}</Text>
        <TextInput
          placeholder="Nome"
          style={styles.input}
          value={editandoAluno ? editandoAluno.nome : novoAluno.nome}
          onChangeText={(text) =>
            editandoAluno ? setEditandoAluno({ ...editandoAluno, nome: text }) : setNovoAluno({ ...novoAluno, nome: text })
          }
        />
        <TextInput
          placeholder="CPF"
          style={styles.input}
          value={editandoAluno ? editandoAluno.cpf : novoAluno.cpf}
          onChangeText={(text) =>
            editandoAluno ? setEditandoAluno({ ...editandoAluno, cpf: text }) : setNovoAluno({ ...novoAluno, cpf: text })
          }
        />
        
        <TouchableOpacity style={styles.buttonAdd} onPress={editandoAluno ? editarAluno : adicionarAluno}>
          <Text style={styles.buttonText}>{editandoAluno ? 'Salvar Alterações' : 'Adicionar Aluno'}</Text>
        </TouchableOpacity>
        {editandoAluno && (
          <TouchableOpacity style={styles.buttonCancel} onPress={() => setEditandoAluno(null)}>
            <Text style={styles.buttonText}>Cancelar Edição</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E8F5E9',
  },
  tableContainer: {
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
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cell: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  form: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#388E3C',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#B2DFDB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#E0F2F1',
  },
  buttonAdd: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonEdit: {
    backgroundColor: '#2196F3',
    padding: 8,
    borderRadius: 8,
    marginLeft: 4,
    alignItems: 'center',
  },
  buttonDelete: {
    backgroundColor: '#FF5252',
    padding: 8,
    borderRadius: 8,
    marginLeft: 4,
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: '#FF8A65',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
