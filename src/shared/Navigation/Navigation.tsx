import React from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_DEMO_2 } from "@/data/navigation";
import { httpRequest } from "@/api/hello/httpRequest";
import { API } from "@/constants/common";

function Navigation() {

  const [headerItems, setHeaderItems] = React.useState([]);


  const allCategory = async () => {
    try {
      const response = await httpRequest({
        url: API.HEADER,
        method: 'GET',
      });
      setHeaderItems(response.header_menu);
    } catch (error) {
      console.error('Error fetching referral data:', error);
    }
    // finally{
    //   setLoading(false);
    // }
  };


  React.useEffect(() => {
    allCategory();
  }, []); 
  return (
    <ul className="nc-Navigation flex items-center">
     {Object.entries(headerItems).slice(1).map(([key, value], index) => (
        <NavigationItem href={'/collection'} key={index} menuItem={{ name: key, link: value }} />
      ))}
    </ul>
  );
}

export default Navigation;
