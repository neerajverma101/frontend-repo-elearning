import { Autocomplete, Group, ScrollArea, Stack, Textarea, TextInput } from '@mantine/core';
import { DateInput, DateTimePicker, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import dayjs from 'dayjs';
import DynamicAutocomplete from './DynamicAutoComplete';
import DynamicMultiSelect from './DynamicMultiSelect';

interface DynamicFormProps {
    formData: [
        {
            path: string, required: boolean, formControl: {
                name: string, type: string, data: [], maxLength: number, label: string, options: [], apiDetails: {},
                isMultiSelect: boolean
            }
        }
    ],
    formSubmit: () => void,
    formSubmitButtonJsx: any
    formValues: any;
    isEdit: boolean;
}

export const formName = {
    countryId: 'country',
    stateId: 'state',
    cityId: 'city',
}




const DynamicForm = (props: DynamicFormProps) => {
    const { formData, formSubmit, formSubmitButtonJsx, formValues, isEdit } = props
    const formHook = useForm({ initialValues: isEdit ? { ...formValues } : {} })
    console.log(formData);
    return (
        <div>
            <form onSubmit={formHook.onSubmit(formSubmit)}>
                <ScrollArea style={{ height: "60vh", paddingRight: '1rem' }} offsetScrollbars>
                    <Stack>
                        {
                            formData.map(field => {
                                const { path, required, formControl } = field;
                                const { name, type, options = [], maxLength, label, apiDetails } = formControl || {}

                                switch (name) {
                                    case "input":
                                        return <TextInput
                                            label={label}
                                            type={type}
                                            required={required}
                                            maxLength={maxLength}
                                            key={formHook.key(path)}
                                            {...formHook.getInputProps(path)}
                                        />
                                    case "select":
                                        return <Autocomplete
                                            label={label}
                                            required={required}
                                            data={options}
                                            key={formHook.key(path)}
                                            {...formHook.getInputProps(path)}
                                        />
                                    case "autosuggest":
                                        return <DynamicAutocomplete
                                            label={label}
                                            apiDetails={apiDetails}
                                            onSelect={(item) => {
                                                formHook.setFieldValue(formName[path] || path, item)
                                            }}
                                            defaultValue={formValues && formValues[formName[path]]}
                                        />
                                    case 'dateTimePicker':
                                        return <DateTimePicker
                                            label={label}
                                            placeholder="Pick date and time"
                                            value={new Date()}
                                            minDate={new Date()}
                                            maxDate={dayjs(new Date()).add(1, 'month').toDate()}
                                            required
                                        />
                                    case 'datePicker':
                                        return <DateInput
                                            label={label}
                                            placeholder="Please select a date"
                                            {...formHook.getInputProps(path)}
                                            required
                                        />
                                    case 'timePicker':
                                        return <TimeInput
                                            label={label}
                                            {...formHook.getInputProps(path)}
                                            required
                                        ></TimeInput>
                                    case 'textarea':
                                        return <Textarea
                                            label={label}
                                            {...formHook.getInputProps(path)}
                                            required
                                        ></Textarea>
                                    case 'multiSelectWithAutoSuggest':
                                        return <DynamicMultiSelect
                                            label={label}
                                            apiDetails={apiDetails}
                                            onSelect={(items: []) => {
                                                const selectedValues = formHook.values[path] || [];
                                                const updatedValues = [...selectedValues, ...items]
                                                formHook.setFieldValue(path, updatedValues)
                                            }}
                                            defaultValue={formValues && formValues[path]}
                                        />
                                    default:
                                        break;
                                }
                            })
                        }
                    </Stack>
                </ScrollArea>
                <Group mt={'md'}>
                    {formSubmitButtonJsx}
                </Group>

            </form>
        </div>
    );
};

export default DynamicForm;