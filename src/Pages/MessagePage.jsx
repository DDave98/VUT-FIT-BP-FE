import {NotificationManager} from 'react-notifications';
import "../Styles/MessagePage.css";
import Dropdown from '../Components/Dropdown';
import Pagination from '../Components/Pagination';
import PerPage from '../Components/PerPage';
import TableView from '../Components/TableView';
import ViewTypeSelect from '../Components/ViewTypeSelect';
import ModalDetail from '../Components/Modal-Detail';
import { useState } from 'react';

const MessagePage = () =>
{
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () =>
    {
        setShowModal(false);
    };

    
    const matchCount = 2000;
    const totalPages = 20;

    const headers = [
        {
            name: "Datum Odeslání",
            class: "col-10"
        },
        {
            name: "Odesílatel",
            class: "col-10"
        },
        {
            name: "Předmět",
            class: "col-10"
        },
    ];

    const filters = {
        sort: headers.map((opt) => (opt.name)),
        directions: ["Vzestupně", "Sestupně"],
        type: ["Upozornění", "Informace", "Chyba"]
    }

    const data = [
        { 
            created: "18/2/2023 9:47:15",
            type: "Warning",
            user: "Dave", 
            app: "App 2",
            ip: "192.168.0.3",
            note: "Access denied",
        },
        { 
            created: "13/3/2023 6:8:15",
            type: "Information",
            user: "Dave", 
            app: "App 2",
            ip: "192.168.0.3",
            note: "Access denied",
        },
        { 
            created: "25/2/2023 6:52:55",
            type: "Error",
            user: "Dave", 
            app: "App 2",
            ip: "192.168.0.3",
            note: "Access denied",
        },
        { 
            created: "18/2/2023 9:47:15",
            type: "Warning",
            user: "Dave", 
            app: "App 2",
            ip: "192.168.0.3",
            note: "Access denied",
        },
        { 
            created: "13/3/2023 6:8:15",
            type: "Information",
            user: "Dave", 
            app: "App 2",
            ip: "192.168.0.3",
            note: "Access denied",
        },
        { 
            created: "25/2/2023 6:52:55",
            type: "Error",
            user: "Dave", 
            app: "App 2",
            ip: "192.168.0.3",
            note: "Access denied",
        },
        { 
            created: "18/2/2023 9:47:15",
            type: "Warning",
            user: "Dave", 
            app: "App 2",
            ip: "192.168.0.3",
            note: "Access denied",
        },
        { 
            created: "13/3/2023 6:8:15",
            type: "Information",
            user: "Dave", 
            app: "App 2",
            ip: "192.168.0.3",
            note: "Access denied",
        },
        { 
            created: "25/2/2023 6:52:55",
            type: "Error",
            user: "Dave", 
            app: "App 2",
            ip: "192.168.0.3",
            note: "Access denied",
        },
    ];
    
    return (
        <div className='LogPage'>
            <h1>Přehled Zpráv</h1>

            {/* <!-- filter panel --> */}
            <div className="filter-panel">
                <div className="filter-panel-content">
                    
                    <h2>Filtry</h2>
                    
                    {/* <!-- searchbar --> */}
                    <input type="text" id="myInput" onkeyup="FilterBySearch()" placeholder="Hledat" title="Type in a name" />
                    
                    {/* <!-- Sorting --> */}
                    <div className="sorting">


                    {/* <!-- řazeni podle sloupce --> */}
                    <div className="sorting-dropdown">
                        <label for="sort-col">Zobrazit:</label>
                        <select name="sort-col" id="cars">
                            <option className="" >vše </option>
                            <option className="" >Zobrazené </option>
                            <option className="" >Nezobrazené </option>
                        </select>
                    </div>

                        {/* <!-- řazeni podle sloupce --> */}
                        <div className="sorting-dropdown">
                        <label for="sort-col">Typ zprávy:</label>
                            <select name="sort-col" id="cars">
                                <option className="" >vše </option>
                                <option className="" >Pozvánky</option>
                                <option className="" >Oznámení</option>
                                <option className="" >Chyby</option>
                            </select>
                        </div>
                    
                        {/* <!-- řazeni podle sloupce --> */}
                        <div className="sorting-dropdown">
                            <label for="sort-col">řadit podle:</label>
                            <select name="sort-col" id="cars">
                                {
                                    filters.sort.map((opt) => (
                                        <option value={opt}>{opt}</option>
                                    ))
                                }
                            </select>
                        </div>
                    
                        {/* <!-- směr řazení --> */}
                        <div className="sorting-dropdown">
                            <label for="cars">směr řazení:</label>
                            <select name="cars" id="cars">
                                {
                                    filters.directions.map((opt) => (
                                        <option value={opt}>{opt}</option>
                                    ))
                                }
                            </select>
                        </div>

                    </div>
                    
                    <div className="panel-bottom">
                        <div className="SearchCounter">
                            počet výsledků: <p>150</p>
                        </div>

                        <div className="tri-state-toggle">

                            <button className="tri-state-toggle-button active" id="toggle-button1">
                                Příchozí
                            </button>

                            <button className="tri-state-toggle-button" id="toggle-button2">
                                Odeslané
                            </button>

                            <button className="tri-state-toggle-button" id="toggle-button3">
                                Smazané
                            </button>

                        </div>

                        <button className="refresh">
                            <span></span>
                            <label> obnovit</label>
                        </button>

                        <PerPage />
                    </div>                
                </div>
            </div>

            {/* <!-- Table of content --> */}
            <div class="contentContainer">
    <div class="messageStack">

      <div class="stackItem">
        <div class="stackItemType">
          <span class="gg-info"></span>
        </div>
        <div class="stackItemView">
          <div class="stackItemHeader stackItemLine">
            <h3 class="stackItemApp">Aplikace 1</h3>
            <p class="stackItemDate">15.3.2023 10:23:20</p>
          </div>
          <div class="stackItemSubject">
            Pozvánka do aplikace Aplikace 1
          </div>
        </div>
      </div>
      <div class="stackItem">
        <div class="stackItemType">
          <span class="gg-info"></span>
        </div>
        <div class="stackItemView">
          <div class="stackItemHeader stackItemLine">
            <h3 class="stackItemApp">Aplikace 1</h3>
            <p class="stackItemDate">15.3.2023 10:23:20</p>
          </div>
          <div class="stackItemSubject">
            Pozvánka do aplikace Aplikace 1
          </div>
        </div>
      </div>
      <div class="stackItem">
        <div class="stackItemType">
          <span class="gg-info"></span>
        </div>
        <div class="stackItemView">
          <div class="stackItemHeader stackItemLine">
            <h3 class="stackItemApp">Aplikace 1</h3>
            <p class="stackItemDate">15.3.2023 10:23:20</p>
          </div>
          <div class="stackItemSubject">
            Pozvánka do aplikace Aplikace 1
          </div>
        </div>
      </div>
      <div class="stackItem">
        <div class="stackItemType">
          <span class="gg-info"></span>
        </div>
        <div class="stackItemView">
          <div class="stackItemHeader stackItemLine">
            <h3 class="stackItemApp">Aplikace 1</h3>
            <p class="stackItemDate">15.3.2023 10:23:20</p>
          </div>
          <div class="stackItemSubject">
            Pozvánka do aplikace Aplikace 1
          </div>
        </div>
      </div>
      <div class="stackItem">
        <div class="stackItemType">
          <span class="gg-info"></span>
        </div>
        <div class="stackItemView">
          <div class="stackItemHeader stackItemLine">
            <h3 class="stackItemApp">Aplikace 1</h3>
            <p class="stackItemDate">15.3.2023 10:23:20</p>
          </div>
          <div class="stackItemSubject">
            Pozvánka do aplikace Aplikace 1
          </div>
        </div>
      </div>
      
      <div class="stackItem">
        <div class="stackItemType">
          <span class="gg-info"></span>
        </div>
        <div class="stackItemView">
          <div class="stackItemHeader stackItemLine">
            <h3 class="stackItemApp">Aplikace 1</h3>
            <p class="stackItemDate">15.3.2023 10:23:20</p>
          </div>
          <div class="stackItemSubject">
            Pozvánka do aplikace Aplikace 1
          </div>
        </div>
      </div>
      <div class="stackItem">
        <div class="stackItemType">
          <span class="gg-info"></span>
        </div>
        <div class="stackItemView">
          <div class="stackItemHeader stackItemLine">
            <h3 class="stackItemApp">Aplikace 1</h3>
            <p class="stackItemDate">15.3.2023 10:23:20</p>
          </div>
          <div class="stackItemSubject">
            Pozvánka do aplikace Aplikace 1
          </div>
        </div>
      </div>
      <div class="stackItem">
        <div class="stackItemType">
          <span class="gg-info"></span>
        </div>
        <div class="stackItemView">
          <div class="stackItemHeader stackItemLine">
            <h3 class="stackItemApp">Aplikace 1</h3>
            <p class="stackItemDate">15.3.2023 10:23:20</p>
          </div>
          <div class="stackItemSubject">
            Pozvánka do aplikace Aplikace 1
          </div>
        </div>
      </div>
      <div class="stackItem">
        <div class="stackItemType">
          <span class="gg-info"></span>
        </div>
        <div class="stackItemView">
          <div class="stackItemHeader stackItemLine">
            <h3 class="stackItemApp">Aplikace 1</h3>
            <p class="stackItemDate">15.3.2023 10:23:20</p>
          </div>
          <div class="stackItemSubject">
            Pozvánka do aplikace Aplikace 1
          </div>
        </div>
      </div>
      <div class="stackItem">
        <div class="stackItemType">
          <span class="gg-info"></span>
        </div>
        <div class="stackItemView">
          <div class="stackItemHeader stackItemLine">
            <h3 class="stackItemApp">Aplikace 1</h3>
            <p class="stackItemDate">15.3.2023 10:23:20</p>
          </div>
          <div class="stackItemSubject">
            Pozvánka do aplikace Aplikace 1
          </div>
        </div>
      </div>
      <div class="stackItem">
        <div class="stackItemType">
          <span class="gg-info"></span>
        </div>
        <div class="stackItemView">
          <div class="stackItemHeader stackItemLine">
            <h3 class="stackItemApp">Aplikace 1</h3>
            <p class="stackItemDate">15.3.2023 10:23:20</p>
          </div>
          <div class="stackItemSubject">
            Pozvánka do aplikace Aplikace 1
          </div>
        </div>
      </div>
      <div class="stackItem">
        <div class="stackItemType">
          <span class="gg-info"></span>
        </div>
        <div class="stackItemView">
          <div class="stackItemHeader stackItemLine">
            <h3 class="stackItemApp">Aplikace 1</h3>
            <p class="stackItemDate">15.3.2023 10:23:20</p>
          </div>
          <div class="stackItemSubject">
            Pozvánka do aplikace Aplikace 1
          </div>
        </div>
      </div>
    </div>
    <div class="MessageViewWindow">
      <h3>Aplikace 1</h3>
      <div class="MessageWindowHead">
        <div class="MessageWindowIco">
        </div>
        <div class="HeaderWindowInfo">
          <div>dne 15.3.2023 10:23:20</div>
          <div>od <a href="#">Jmeno Příjmení</a> </div>
        </div>
        
      </div>
      <div class="MessageWindowBody">
        

Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Duis bibendum, lectus ut viverra rhoncus, dolor nunc faucibus libero, eget facilisis enim ipsum id lacus. Nulla pulvinar eleifend sem. Integer malesuada. Nam quis nulla. Integer vulputate sem a nibh rutrum consequat. Nunc dapibus tortor vel mi dapibus sollicitudin. Fusce tellus odio, dapibus id fermentum quis, suscipit id erat. Nullam sit amet magna in magna gravida vehicula. Aliquam ornare wisi eu metus. Sed convallis magna eu sem. Nunc auctor. Donec iaculis gravida nulla.

Nullam rhoncus aliquam metus. Sed elit dui, pellentesque a, faucibus vel, interdum nec, diam. Sed ac dolor sit amet purus malesuada congue. Etiam egestas wisi a erat. Cras pede libero, dapibus nec, pretium sit amet, tempor quis. Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit amet enim. Duis bibendum, lectus ut viverra rhoncus, dolor nunc faucibus libero, eget facilisis enim ipsum id lacus. Mauris dictum facilisis augue. Integer pellentesque quam vel velit. Nulla quis diam. Phasellus faucibus molestie nisl. Sed convallis magna eu sem. Donec iaculis gravida nulla. Aliquam id dolor. Quisque porta. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Vivamus ac leo pretium faucibus.

Maecenas lorem. Mauris elementum mauris vitae tortor. Sed elit dui, pellentesque a, faucibus vel, interdum nec, diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Mauris dictum facilisis augue. Maecenas aliquet accumsan leo. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Maecenas aliquet accumsan leo. Aliquam ante. Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit amet enim. Proin mattis lacinia justo. Aliquam in lorem sit amet leo accumsan lacinia. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Fusce tellus odio, dapibus id fermentum quis, suscipit id erat. Aliquam erat volutpat. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit.

Etiam egestas wisi a erat. Quisque porta. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Etiam dictum tincidunt diam. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Fusce tellus. Morbi scelerisque luctus velit. Integer in sapien. Proin pede metus, vulputate nec, fermentum fringilla, vehicula vitae, justo. Integer pellentesque quam vel velit. In dapibus augue non sapien. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
      </div>
    </div>
  </div>
        
            {/* <!-- Footer of page --> */}
            <div className="table-footer">
                <div className="table-footer-content">
                    
                    {/* <!-- pagination --> */}
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
            <ModalDetail show={showModal} onClose={handleCloseModal} header="Detail Zprávy"/>
        </div>
    );
}

export default MessagePage;