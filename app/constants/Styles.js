import { Dimensions } from "react-native";
import Colors from "./Colors";

export default Styles = {
    heading:{
        color:Colors.black2,
        fontSize:30,
        lineHeight:36,
        fontWeight:'bold'
    },
    secondaryText:{
        color:Colors.dGrey,
        fontSize:12,
        lineHeight:15,
        fontWeight:'normal'
    },
    actionText:{
        textAlign:'center',
        color:Colors.main,
        fontWeight:'bold',
        fontSize:12,
        lineHeight:14.52
    },
    formContainer:{
        // height:Dimensions.get('screen').height/4.5,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        
    },
    screen:{
        flex:1,
        backgroundColor:'white'
    },
    row:{
        flexDirection:'row'
    }
}