import { StyleSheet, Text, View, Image } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      
      <Image source={require('./unoesc.png')} style={styles.headerImage} />

      <Text style={styles.title}>Chamada Inteligente</Text>
      <Text style={styles.subtitle}>Engenharia da Computação</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headerImage: {
    height: 150,             // Altura da imagem
   
    resizeMode: 'contain',   // Mantém as proporções da imagem
    marginBottom: 30,        // Espaço entre a imagem e o título
    borderRadius: 10,        // Cantos arredondados na imagem
    shadowColor: '#000',     // Sombra suave para um efeito flutuante
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',           // Cor mais neutra e moderna
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    color: '#666',           // Cinza suave
    textAlign: 'center',     // Centraliza o subtítulo
    maxWidth: '80%',         // Limita a largura para telas menores
  },
});
