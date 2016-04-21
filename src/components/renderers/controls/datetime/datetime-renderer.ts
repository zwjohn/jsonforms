
import {IRenderer} from "../../jsonforms-renderers";
import {RenderDescriptionFactory} from "../../jsonforms-renderers";
import {Services} from "../../../services/services";
import {IRenderDescription} from "../../jsonforms-renderers";

class DatetimeRenderer implements IRenderer {

    priority = 3;

    render(element: IControlObject, schema: SchemaElement, schemaPath: string, services: Services): IRenderDescription {
        var control = RenderDescriptionFactory.createControlDescription(schemaPath, services, element);
        control['isOpen'] = false;
        control['openDate'] = function($event) {
            control['isOpen'] = true;
        };
        control['template'] =
            `<jsonforms-control>
            <div class="input-group">
              <input type="text" ${element.readOnly ? 'readonly' : ''} datepicker-popup="dd.MM.yyyy" close-text="Close" is-open="element.isOpen" id="${schemaPath}" class="form-control jsf-control-datetime" data-jsonforms-model  data-jsonforms-validation/>
                 <span class="input-group-btn">
                   <button type="button" class="btn btn-default" ng-click="element.openDate($event)">
                     <i class="glyphicon glyphicon-calendar"></i>
                   </button>
                 </span>
            </div>
            </jsonforms-control>`;
        return control;
    }

    isApplicable(uiElement: IUISchemaElement, subSchema: SchemaElement, schemaPath: string): boolean {
        return uiElement.type == 'Control' && subSchema !== undefined && subSchema.type == "string" &&
            subSchema['format'] != undefined && subSchema['format'] == "date-time";
    }
}

export default angular
    .module('jsonforms.renderers.controls.datetime', ['jsonforms.renderers.controls'])
    .run(['RenderService', (RenderService) => {
        RenderService.register(new DatetimeRenderer());
    }])
    .name;