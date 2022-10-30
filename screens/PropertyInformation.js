import Layout from "../components/Layout";
import Header from "../components/Header";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useStripe } from "@stripe/stripe-react-native";
import React, { useState, useEffect } from 'react';
import {COLORS, FONTS, SIZES, icons} from '../constants'
import {Container, ContainerHeader, ContainerHeaderGeral, Text, Image, ContainerNeutro} from './styles'
import { View, FlatList, ScrollView, Modal, StyleSheet, TouchableOpacity, Animated, SafeAreaView, Touchable, Pressable, ActivityIndicator } from 'react-native';
import { useRef } from 'react';
import { VictoryPie } from 'victory-native';
import {Svg} from 'react-native-svg';
import { LogBox } from 'react-native';
import SimpleModal from "../components/SimpleModal";
import firebase from "firebase";
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import PropertyInformation1 from "./PropertyInformation1"

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality']);


import Dimensions from "../utilities/Dimensions";
import { Alert } from "react-native";

const { SCREEN_WIDTH, DEVICE_HEIGHT, STATUSBAR_HEIGHT } = Dimensions;

const PropertyInformation = ({ navigation }) => {

     const [currentDate, setCurrentDate] = useState('');
     const [monthN, setMonthN] = useState(1);
     const [currentMonth, setCurrentMonthe] = useState('');
     const [waterValue, setWaterValue] = useState();
     const [isLoading, setIsLoading] = React.useState(false);
     
          useEffect(() => {
          
          var date = new Date().getDate(); //Current Date
          var month = new Date().getMonth() + 1; //Current Month
          var year = new Date().getFullYear(); //Current Year

          setCurrentDate(
               date + ' October ' + year
          );

          if (month == 10) {
               setWaterValue(35);
          } else {
               
          }
          
          getInfomation();
          
          }, []);
          
           
             const getInfomation = () => {
               const userId = firebase.auth().currentUser?.uid;
               var month = new Date().getMonth() + monthN;
               firebase
                 .database()
                 .ref(`PropertyInformation/${month}`)
                 .once("value", (snapshot) => {
                   const { water, electricity, sanitation, solidWaste, other, banner, total } = snapshot.val();
                   setOther(other)
                   setWater(water)
                   setElectricity(electricity)
                   setSanitation(sanitation)
                   setSolidWaste(solidWaste)
                   setBanner(banner)
                   setTotal(total)
                 });
             };

             
             const [water, setWater] = useState(35);
             const [electricity, setElectricity] = useState(35);
             const [sanitation, setSanitation] = useState(25);
             const [solidWaste, setSolidWaste] = useState(10);
             const [other, setOther] = useState(10);
             const [banner, setBanner] = useState();
             const [total, setTotal] = useState()

             


     //dummy date
     const pendingStatus = "C"
     const confirmStatus = "P"
     
     const categoriesData = [ 
          

          {
              id: 1,
              name: "Water",
              icon: icons.watertap,
              color: COLORS.blue,
              expenses: [
                  {
                      id: 1,
                      title: "Water Usage",
                      description: "description of water usage for month of October",
                      amount: 'Amount water used: A number(litres)',
                      total: water,
                      status: pendingStatus,
                  },                
              ],
          },
          {
              id: 2,
              name: "Electricity",
              icon: icons.energy,
              color: COLORS.darkblue,
              expenses: [
                  {
                      id: 2,
                      title: "Electricity usage",
                      description: "description of electricity usage for month of October",
                      amount: "electricity used: A number(watts)",
                      total: electricity,
                      status: pendingStatus,
                  },
              ],
          },
          {
              id: 3,
              name: "Sanitation",
              icon: icons.liquidsoap,
              color: COLORS.bluegrey,
              expenses: [
                  {
                      id: 3,
                      title: "Sanitation",
                      description: "???",
                      amount: "???",
                      total: sanitation,
                      status: pendingStatus,
                  },
              ],
          },
          {
              id: 4,
              name: "Solid Waste",
              icon: icons.waste,
              color: COLORS.darkgray,
              expenses: [
                  {
                      id: 4,
                      title: "Solid Waste collected",
                      description: "description of waste collected for month of October",
                      amount: "Amount collected: A number(KG)",
                      total: solidWaste,
                      status: pendingStatus,
                  },
              ],
          },
          {
               id: 5,
               name: "Other",
               icon: icons.more_icon,
               color: COLORS.lightBlue,
               expenses: [
                   {
                       id: 5,
                       title: "???",
                       description: "???",
                       amount: "???",
                       total: other,
                       status: pendingStatus,
                   },
               ],
           },
          
           

      ];


      const data = [
          { label: 'January', value: '1' },
          { label: 'February', value: '2' },
          { label: 'March ', value: '3' },
          { label: 'April', value: '4' },
          { label: 'May', value: '5' },
          { label: 'June', value: '6' },
          { label: 'July', value: '7' },
          { label: 'August', value: '8' },
          { label: 'September', value: '9' },
          { label: 'October', value: '10' },
          { label: 'November', value: '11' },
          { label: 'December', value: '12' },
        ];

     const [value, setValue] = useState(10);
     const [isFocus, setIsFocus] = useState(false);

     const OctoberData = async () => setMonthlyData(true)
     const categoryListHeightAnimationValue = useRef(new Animated.Value(115)).current
     const [monthlyData, setMonthlyData] = useState(undefined);
     const [categories, setCategories] = useState( categoriesData );
     
     const [viewMode, setViewMode] = useState("chart")
     const [selectedCategory, setSelectedCategory] = useState(null)
     const [showMoreToggle, setShowMoreToggle] = useState(false)

     
     const [isModalVisible, setisModalVisible] = useState(false);
     const [chooseData, setChooseData] = useState();
     const changeModalVisible = (bool) =>{
       setisModalVisible(bool);
     }
   
     const setData = (data) => {
       setisModalVisible(data)
     }

     const onPressMonth = async ({value}) => {
               setisModalVisible(data)
             }

     const loadingScreen = async () =>{
          
          return(
          OctoberData(true)
          )
          }


     function renderHeader(){
          return(
               <ContainerHeaderGeral style={{ paddingHorizontal: SIZES.padding, backgroundColor:COLORS.white, marginLeft:7, paddingVertical: 3, width: "100%",}}>
                    <ContainerNeutro>
                         <Text style={{ color: COLORS.primary, ...FONTS.h2}}>
                              My Statement
                         </Text>
                         <View style={{flexDirection:"row", justifyContent:"space-between",}}>
                              <Text style={{color: COLORS.darkgray, ...FONTS.h3}}>
                                   Summary (private)
                              </Text>
                              <Text style={{color: COLORS.darkgray, ...FONTS.h3, marginRight:10}}>
                                   Owe: R{total}
                              </Text>
                         </View>
                         
                         
                    </ContainerNeutro>
                    <ContainerNeutro style={{ flexDirection: 'row', marginTop: SIZES.padding, alignItems: 'center', }}>
        
                              <ContainerNeutro style={{ width:"35%"}}>
                              <TouchableOpacity disabled={true} style={{ flex:1,}}> 
                                   <Dropdown
                                        style={[styles.dropdown, isFocus && { borderColor: '#407ad6' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        containerStyle={styles.dropDrownContain}
                                        showsVerticalScrollIndicator={false}
                                        data={data}
                                        //search
                                        maxHeight={200}
                                        labelField="label"
                                        valueField="October"
                                        placeholder={!isFocus ? 'October' : 'Select Month'}
                                        value={value}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                        onChange={(item) => {
                                        setValue(item.value);
                                        setIsFocus(false);
                                         if (item.value == 10)  {
                                             setIsLoading(true);;
                                             setMonthlyData(false)
                                        } else if (item.value)  {
                                             Alert.alert(
                                                  item.label,
                                                  "The data for the month you selected is currently unavaible, Please contact the administrator"
                                             )
                                        } 
                                        } }
                                        />
                              
                         </TouchableOpacity>
                         </ContainerNeutro >
                              <View style={{ width:"80%"}}>
                                   <View style={{ marginLeft: 10, width:"75%"}}>
                                        <Text style={{color: COLORS.primary, ...FONTS.h3, }}>
                                             {currentDate}
                                        </Text>
                                        <Text style={{...FONTS.body3, color: COLORS.darkgray, flexWrap: 'wrap', }}>
                                        {banner}
                                        </Text>
                                   </View> 
                              </View>
                                            
                         </ContainerNeutro>
     
                   
               </ContainerHeaderGeral>
          )
     }

     function renderCategoryHeaderSection(){
          return(
               <ContainerNeutro style={{flexDirection: 'row', padding:SIZES.padding, justifyContent: 'space-between', alignItems: 'center'}}>
                    {/* title */}
                    <ContainerNeutro>
                         <Text style={{color: COLORS.primary, ...FONTS.h3, paddingHorizontal:5}}>CATEGORIES</Text>
                         <Text style={{color: COLORS.primary, ...FONTS.h4, paddingHorizontal:5}}>{categories.length} Total</Text>
                    </ContainerNeutro>
                    {/* buttons */}
                    <ContainerNeutro style={{flexDirection: 'row'}}>
                         <TouchableOpacity style={{alignItems: 'center', justifyContent:'center', height:50, width:50, backgroundColor: viewMode == "chart" ? COLORS.secondary: null, borderRadius:25}}
                              onPress={() => setViewMode('chart')}
                         >
                              <Image source={icons.chart} resizeMode="contain" style={{width:20, height:20, tintColor: viewMode === 'chart' ? COLORS.white : COLORS.darkgray}} />
                         </TouchableOpacity>
                         <TouchableOpacity style={{alignItems: 'center', justifyContent:'center', height:50, width:50, backgroundColor: viewMode == "list" ? COLORS.secondary: null, borderRadius:25}}
                          onPress={() => setViewMode('list')}
                         >
                              <Image source={icons.menu} resizeMode="contain" style={{width:20, height:20, tintColor: viewMode === 'list' ? COLORS.white : COLORS.darkgray}} />
                         </TouchableOpacity>
                    </ContainerNeutro>
               </ContainerNeutro>
          )
     }

     function renderCategoryList(){

          const  renderItem = ({item}) => {
               return(
                    <TouchableOpacity style={{flex: 1, flexDirection: 'row', 
                    margin:5, paddingVertical:  SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    borderRadius: 5,
                    backgroundColor: COLORS.white,
                    ...styles.shadow}}
                         onPress={() => setSelectedCategory(item)}
                    >
                         <Image 
                              source={item.icon}
                              style={{width:20, height: 20, tintColor: item.color,
                                     
                              }}

                         />
                         <Text style={{marginLeft: SIZES.base, color: COLORS.primary, ...FONTS.h4}} >{item.name}</Text>
                    </TouchableOpacity>
               )
          }

          return(
               <ContainerNeutro style={{paddingHorizontal: SIZES.padding - 5, }}>
                    <Animated.View style={{height: categoryListHeightAnimationValue}}>
                         <FlatList 
                              scrollEnabled={false}
                              data={categories}
                              numColumns={2}
                              keyExtractor={item => String(item.id)}
                              renderItem={renderItem}
                           
                         />
                    </Animated.View>
                    <TouchableOpacity style={{
                         flexDirection: 'row',
                         marginVertical: SIZES.base,
                         justifyContent: 'center'
                    }} 
                    onPress={() => {
                         if(showMoreToggle){
                              Animated.timing(
                                   categoryListHeightAnimationValue,
                                   {
                                        toValue: 115,
                                        duration: 500,
                                        useNativeDriver:false
                                   }
                              ).start()
                         }else{
                              Animated.timing(
                                   categoryListHeightAnimationValue,
                                   {
                                        toValue: 175,
                                        duration: 500,
                                        useNativeDriver:false
                                   }
                              ).start()
                         }
                         setShowMoreToggle(!showMoreToggle);
                    }}>
                         <Text style={{...FONTS.body4}}>{!showMoreToggle ? 'More' : 'Less'}</Text>
                         <Image source={!showMoreToggle ? icons.down_arrow : icons.up_arrow} 
                              style={{marginLeft:5, width: 15, height: 15, alignSelf: 'center'}}
                         />
                    </TouchableOpacity>

               </ContainerNeutro>
          )
     }

     function renderIncomingExpress() {
          const renderItem = ({item, index}) => {
               return(
                    <ContainerNeutro 
                         style={{
                              width: 250,
                              marginBottom: 10,
                              marginRight: SIZES.padding,
                              marginLeft: index == 0 ? SIZES.padding : 0,
                              borderRadius: SIZES.radius,
                              backgroundColor: COLORS.white,
                              ...styles.shadow
                         }}
                    >
                         <ContainerNeutro style={{flexDirection: 'row', padding:SIZES.padding, alignItems: 'center'}}>
                              <ContainerNeutro style={{
                                   height: 50,
                                   width: 50,
                                   borderRadius: 25,
                                   backgroundColor: COLORS.lightGray,
                                   alignItems:'center',
                                   justifyContent: 'center'
                              }}>
                                   <Image source={selectedCategory.icon}
                                        style={{
                                             width: 30,
                                             height: 30,
                                             tintColor: selectedCategory.color
                                        }}
                                   /> 
                              </ContainerNeutro>
                              <Text style={{...FONTS.h3, color: selectedCategory.color}}>
                                   {selectedCategory.name}</Text>
                         </ContainerNeutro>
                              {/* EXPENSES description */}
                         <ContainerNeutro>
                              <ContainerNeutro style={{padding: SIZES.padding}}>
                                        {/* TITLE AND DESCRIPTION */}
                                   <Text style={{...FONTS.h2}}>{item.title}</Text>
                                   <Text style={{...FONTS.body3, flexWrap: 'wrap', color: COLORS.darkgray}}>{item.description}</Text>
                                   
                                   {/* amount */}
                              
                                   <Text style={{marginTop: SIZES.padding, ...FONTS.h4}}>Amount</Text>
                                   <ContainerNeutro style={{flexDirection:'row'}}>
                                        <Image source={icons.all} style={{
                                             width: 20,
                                             height: 20,
                                             tintColor: COLORS.darkgray,
                                             marginRight: 5
                                        }}/>
                                        
                                        <Text style={{marginBottom: SIZES.base, color: COLORS.darkgray, ...FONTS.body4}}>{item.amount}</Text>
                                   </ContainerNeutro>

                              </ContainerNeutro>

                         </ContainerNeutro>

                         {/* PRICE */}
                         <Pressable
                              onPress={() => changeModalVisible(true)}>
                              <ContainerNeutro style={{
                              height: 50,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderBottomStartRadius: SIZES.radius,
                              backgroundColor: selectedCategory.color
                         }}>   
                              <Text style={{color: COLORS.white, ...FONTS.body3}}>MAKE PAYMENT</Text>
                                      
                         </ContainerNeutro>
                         </Pressable>

                              <Modal
                                   transparent={true}
                                   animationType="fade"
                                   visible={isModalVisible}
                                   nRequestClose={() => changeModalVisible(false)}
                              >
                                   <SimpleModal 
                                   changeModalVisible={changeModalVisible}
                                   setData={setData}
                                   />
          
                              </Modal>
                    
                    </ContainerNeutro>
                   

               )
          }
          let allExpenses = selectedCategory ? selectedCategory.expenses : [];
          //Filter pending expenses
          let incomingExpenses = allExpenses.filter(a => a.status == 'C')

          return(
            <ContainerNeutro>
                 {renderIncomingExpressTitle()}
                 {
                      incomingExpenses.length > 0 && 
                      <FlatList
                         
                         data={incomingExpenses}
                         keyExtractor={item => item.id.toString()}
                         renderItem={renderItem}
                         horizontal
                         showsHorizontalScrollIndicator={false}
                      />
                 }
                 {
                      incomingExpenses.length == 0 && 
                      <ContainerNeutro style={{alignItems: 'center', justifyContent: 'center', height: 300}}>
                           <Text style={{color: COLORS.primary, ...FONTS.h3 }}>No Service Record selected</Text>
                      </ContainerNeutro>
                 }
            </ContainerNeutro>
          )
     }

     function renderIncomingExpressTitle() {
          return(
               <ContainerNeutro style={{padding: SIZES.padding, backgroundColor: COLORS.lightGray2 }}>
                    <Text style={{...FONTS.h3, color: COLORS.primary, paddingHorizontal:5}}>Individual Service Cost</Text>
                    <Text style={{...FONTS.body4, color: COLORS.darkgray, paddingHorizontal:5}}>5 Total</Text>
               </ContainerNeutro>
          )
     }

     function processCategoryDataToDisplay(){
          //FILTER EXPENSES WITH 'CONFIRMED' STATUS
          let chartData = categories.map((item) => {
               let confirmExpenses = item.expenses.filter(a => a.status == 'C');
               let total = confirmExpenses.reduce((a, b) => a + (b.total || 0), 0);

               return {
                    name: item.name,
                    y: total,
                    expenseCount: confirmExpenses.length,
                    color: item.color,
                    id: item.id
               }
          })

          //FILTER OUT CATEGORIES WITH NO DATA/EXPENSES
          let filterChartData = chartData.filter(a => a.y > 0);

          let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0);

          //CALCULATE PORCENTAGE AND REPOPULATE CHART DATA
          let finalChartData = filterChartData.map((item) => {
               let percentage = (item.y / totalExpense * 100).toFixed(0)
               return{
                    label: `${percentage}%`, 
                    y: Number(item.y),
                    expenseCount: item.expenseCount,
                    color: item.color,
                    name: item.name,
                    id: item.id
               }
          })

          return finalChartData;

     }

     function setSelectCategoryByName(name){
          let category = categories.filter(a => a.name == name)
          setSelectedCategory(category[0])
     }

     function renderChart(){

          let chartData = processCategoryDataToDisplay();
          let colorScales = chartData.map((item) => item.color);
          let totalExpenseCount = chartData.reduce((a, b) => a + (b.expenseCount || 0), 0)
          return(
               <ContainerNeutro style={{alignItems:'center', justifyContent:'center', height: DEVICE_HEIGHT * 0.4}}>
                   <Svg width={SIZES.SCREEN_WIDTH} height={SIZES.DEVICE_HEIGHT} style={{width: "100%", height: DEVICE_HEIGHT * 0.09}}>

                    <VictoryPie
                    standalone={false} // Android workaround
                    data={chartData}
                    labels={(datum) => `${datum.y}`}
                    radius={({ datum }) => (selectedCategory && selectedCategory.name == datum.name) ? SIZES.SCREEN_WIDTH * 0.4 : SIZES.SCREEN_WIDTH * 0.4 - 10}
                    innerRadius={70}
                    labelRadius={({ innerRadius }) => (SIZES.SCREEN_WIDTH * 0.4 + innerRadius) / 2.5}
                    style={{
                         labels: { fill: "white", ...FONTS.body3 },
                         parent: {
                              ...styles.shadow
                         },
                    }}
                    width={SIZES.SCREEN_WIDTH}
                    height={SIZES.DEVICE_HEIGHT}
                    colorScale={colorScales}
                    events={[{
                         target: "data",
                         eventHandlers: {
                              onPress: () => {
                                   return [{
                                        target: "labels",
                                        mutation: (props) => {
                                        let categoryName = chartData[props.index].name
                                        setSelectCategoryByName(categoryName)
                                        }
                                   }]
                              }
                         }
                    }]}

                    />
                    </Svg>
                    <ContainerNeutro style={{position: 'absolute', top: SIZES.DEVICE_HEIGHT * 0.16, left: SIZES.SCREEN_WIDTH * 0.48, hieght: SIZES.DEVICE_HEIGHT * 0.5}}>
                         <Text style={{...FONTS.h1, textAlign: 'center'}}>{totalExpenseCount}</Text>
                         <Text style={{textAlign: 'center', ...FONTS.h3}}>Services</Text>
                    </ContainerNeutro>
               </ContainerNeutro>
          )
     }

     function renderExpenseSummary(){
          let data = processCategoryDataToDisplay();
          const renderItem = ({item}) => {
               return(
                    <TouchableOpacity style={{flexDirection:'row', height:40, paddingHorizontal:SIZES.radius,
                         borderRadius: 10,
                         backgroundColor: (selectedCategory && selectedCategory.name == item.name) ? item.color : COLORS.white
                    }} onPress={()=>{
                         let categoryName = item.name;
                         setSelectCategoryByName(categoryName);
                    }}>
                         {/* Name/Category */}
                         <ContainerNeutro style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
                              <ContainerNeutro style={{
                                   width:20,
                                   height: 20,
                                   backgroundColor:(selectedCategory && selectedCategory.name == item.name) ?  COLORS.white : item.color,
                                   borderRadius: 5,
                                   marginRight: 5
                              }}>
                              </ContainerNeutro>
                              <Text style={{marginLeft: SIZES.base,color: (selectedCategory && selectedCategory.name == item.name) ? COLORS.white : COLORS.primary}}>{item.name}</Text>
                         </ContainerNeutro>
                         <ContainerNeutro style={{justifyContent:'center'}}>
                              <Text style={{color: (selectedCategory && selectedCategory.name == item.name) ? COLORS.white : COLORS.primary, ...FONTS.h3}}>{item.y} ZAR - {item.label}</Text>
                         </ContainerNeutro>
                    </TouchableOpacity>
               )
          }
          return(
               <ContainerNeutro style={{padding: SIZES.padding}}> 
                   <FlatList 
                         data={data}
                         keyExtractor={item => String(item.id)}
                         renderItem={renderItem}
                   /> 
               </ContainerNeutro>
          )
     }

     

  return (
     
          <Layout>
               <StripeProvider publishableKey="pk_test_51JpykoSAQwW5QLe07A81QSN7eOr7MwJJEoZuUmGTLR89Utg5PDYC9b8U0xeHRwe6JsZ9cB2Iu4HIIW77m8WrJaug0044zPoHP4">
               <Header navigation={navigation} title="Property Informatiuon" />
               {!monthlyData ? (
                         <Container style={{ flex: 1, backgroundColor: COLORS.lightGray2}}>
                         {/* Header section */}
                         {renderHeader()}

                         {/* Category Header Section */}
                         {renderCategoryHeaderSection()}

                         <ScrollView contentContainerStyle={{paddingBottom:60}} style={{flex:1}}>
                              {
                                   viewMode == "list" &&
                                   <ContainerNeutro >
                                        {renderCategoryList()}
                                        {renderIncomingExpress()}
                                   </ContainerNeutro>
                              }
                              {
                                   viewMode == "chart" &&
                                   <ContainerNeutro >
                                        {renderChart()}
                                        {renderExpenseSummary()}
                                   </ContainerNeutro>
                              }


                         </ScrollView>                      
                    </Container>
                    ) : (
                         <PropertyInformation1 />
                         )}
               </StripeProvider>
          </Layout>
    
  );
}
export default PropertyInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },

  inputStyle: {
    minHeight: DEVICE_HEIGHT * 0.06,
    width: SCREEN_WIDTH * 0.9,
    borderColor: "#407ad6",
    borderWidth: 1,
    color: "black",
    marginTop: 20,
    borderRadius: 10,
    padding: 5,
  },
  buttonStyle: {
    width: "70%",
    height: DEVICE_HEIGHT * 0.065,
    backgroundColor: "#407ad6",
    borderRadius: 10,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  dropdown: {
     height: 55,
     borderColor: 'gray',
     borderWidth: 1,
     borderRadius: 20,
     paddingHorizontal: 8,
     width:"100%",

   },
   dropDrownContain: {
     borderColor: '#407ad6',
     borderWidth: 1,
     borderRadius: 20,
     //paddingHorizontal: 5,
     top: -40,
     //backgroundColor:"lightgrey"
   },
   icon: {
     marginRight: 5,
   },
   label: {
     position: 'absolute',
     backgroundColor: 'white',
     left: 22,
     top: 8,
     zIndex: 999,
     paddingHorizontal: 8,
     fontSize: 14,
   },
   placeholderStyle: {
     fontSize: 16,
     width:"95%"
   },
   selectedTextStyle: {
     fontSize: 16,
   },
   iconStyle: {
     width: 20,
     height: 20,
   },
   inputSearchStyle: {
     height: 40,
     fontSize: 16,
   },
});
