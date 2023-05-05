import DetailDataRowInput from "../DetailLayout/DetailDataRowInput";
import { StackItem } from "../Elements/StackItems/StackItems";
import ModalWindow from "../ModalWindow";

const AppPageDetailWindowView = ({clientSec, clientId, show, onClose}) =>
{
    return (
        <>
            <ModalWindow 
                header={"Nový vygenerovaný přístup"} 
                show={show}
                onClose={onClose}
            >
                <StackItem>
                    <h4>Client ID:</h4>
                    <p>{clientId}</p>
                </StackItem>
                <StackItem>
                <h4>Client Secret:</h4>
                    <p>{clientSec}</p>
                </StackItem>
                <div className="notes">
                    <h4>Poznámka:</h4>
                    <p>
                        Vygenerovaný tajný klíč bezpečně uchovejte. Nelze jej pak znovu zobrazit. V případě stráty klíče je možné vygenerovat nový.
                    </p>
                </div>
            </ModalWindow>
        </>
    );
}

export default AppPageDetailWindowView;