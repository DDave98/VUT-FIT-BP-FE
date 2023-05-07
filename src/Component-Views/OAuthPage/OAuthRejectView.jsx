import { StackItem, StackOfItems } from "../../Components/Elements/StackItems/StackItems";
import FormPageLayout from "../../Components/FormPageLayout";

const OAuthRejectView = () =>
{
    return (
        <div className="OAuthRejectView">
            <FormPageLayout name="Autorizační chyba">
                <StackOfItems>
                    <StackItem>aaa</StackItem>
                </StackOfItems>
            </FormPageLayout>
        </div>
    );
}

export default OAuthRejectView;