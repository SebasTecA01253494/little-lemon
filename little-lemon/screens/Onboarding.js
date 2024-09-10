const Onboarding = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const checkValidEmail = validateEmail(email);
  
    return (
      <View style={styles.container}>
        <Headers>
        <Text style={styles.textStyle}>Little Lemon</Text>
        <Image
          style={styles.logo}
          source={ require("../assets/little-lemon-logo-grey.png") }
        />
        </Headers>
        <Text style={styles.textStyle}>Let us Get to know You</Text>

        <TextInput 
          style={styles.inputStyle}
          placeholder='Type your name'
          value={name}
          onChangeText={setName}
          keyboardType="email-address"
          textContentType="name"
        />
        <TextInput 
          style={styles.inputStyle}
          placeholder='Type your email'
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          textContentType="emailAddress"
        />
  
        <Button
          onPress={ () => Alert.alert("Thanks for subscribing, stay tuned!") }
          title="Subscribe"
          color="#006600"
          disabled={!checkValidEmail}
        />
      </View>
    );
  };
  
  export default Onboarding;
  
  const styles = StyleSheet.create({
    container : {
      marginLeft: 25,
      marginRight: 25,
    },
    logo : {
      marginTop: 40,
      marginLeft: 75,
      height: 120,
      width: 200,
      display: "inline",
      resizeMode: "contain"
    },
    textStyle : {
      marginTop: 30,
      marginBottom: 30,
      fontSize: 19,
      textAlign: 'center'
    },
    inputStyle : {
      marginBottom: 20,
      fontSize: 16,
      borderColor: "#000000",
      borderWidth: 1,
      height: 40,
      borderRadius: 10,
      paddingLeft: 10,
      paddingRight: 10,
    },
  })