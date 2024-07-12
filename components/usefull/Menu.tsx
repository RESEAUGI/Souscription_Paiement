import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
interface MenuItem {
  id: string;
  label: string;
  children?: MenuItem[];
}

const NestedMenu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get<any, AxiosResponse<any>>('http://localhost:4000/api/menu');
          //setMenuItems(response.data);;
        //const data = await response.json();
        console.log('menu data');
        
        console.log(response.data);
        
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };

    fetchMenuData();
  }, []);

  const renderSubMenu = (items: MenuItem[]) => (
    <ul className="submenu">
      {items.map((item) => (
        <li key={item.id} className="menu-item">
          <a href="#" className="menu-link">
            {item.label}
          </a>
          {item.children && item.children.length > 0 && (
            <div className="submenu-container">{renderSubMenu(item.children)}</div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <nav className="nested-menu">
      {menuItems.length > 0 && renderSubMenu(menuItems)}
    </nav>
  );
};

export default NestedMenu;