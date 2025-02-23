import restClient from '@/app/api/restClient';
import { Combobox, Loader, TextInput, useCombobox } from '@mantine/core';
import { upperFirst, useDebouncedCallback } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';

interface AutocompleteProps {
    label: string;
    placeholder: string;
    apiDetails: {
        endpoint: string;
        method: 'GET' | 'POST';
        body?: any;
        onMount?: boolean;
        resultKey?: string
    };
    onSelect: (selectedValue: string) => void;
    formValues?: any
    defaultValue?: string;
}

const DynamicAutoComplete: React.FC<AutocompleteProps> = ({
    label,
    apiDetails,
    onSelect,
    defaultValue
}) => {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<string[] | null>(null);
    const [value, setValue] = useState('');
    const [empty, setEmpty] = useState(false);
    const abortController = useRef<AbortController>();
    console.log(data);
    useEffect(() => {
        if (defaultValue) {
            setValue(defaultValue)
        }
    }, [defaultValue])

    const fetchOptions = useDebouncedCallback(async (keyword: string) => {
        abortController.current?.abort();
        abortController.current = new AbortController();
        setLoading(true);
        try {
            const { data } = await restClient.post(apiDetails.endpoint, apiDetails.onMount ? {} : { ...apiDetails.body, keyword, })
            if (data) {
                setData(data);
                const matchedItem = data?.find(item => item.name?.toLowerCase()?.match(value?.toLowerCase()))
                if (matchedItem) {
                    onSelect(matchedItem)
                }
                setLoading(false);
                setEmpty(data.length === 0);
                abortController.current = undefined;
            }
        } catch (error) {
            console.log(error)
        }
    }, 500)

    const options = (data || []).map((item) => (
        <Combobox.Option value={item} key={item.id}>
            {item[apiDetails.resultKey || "name"]}
        </Combobox.Option>
    ));

    useEffect(() => {
        if (apiDetails.onMount) {
            fetchOptions('')
        }
    }, [apiDetails.onMount])


    return (
        <Combobox
            onOptionSubmit={(selectedOption) => {
                setValue(selectedOption[apiDetails.resultKey || "name"]);
                combobox.closeDropdown();
                onSelect && onSelect(selectedOption)
            }}
            withinPortal={false}
            store={combobox}
        >
            {console.log("value", value)}
            <Combobox.Target>
                <TextInput
                    label={label}
                    placeholder={apiDetails.onMount ? '' : "type to search..."}
                    value={value}
                    onChange={(event) => {
                        const value = upperFirst(event.currentTarget.value)
                        setValue(value);
                        if (value.length > 2) {
                            fetchOptions(value)
                            //  combobox.resetSelectedOption();
                            combobox.openDropdown();
                        }
                    }}
                    onClick={() => combobox.openDropdown()}
                    // onFocus={() => {
                    //     combobox.openDropdown();
                    //     // if (data === null) {
                    //     //     fetchOptions(value);
                    //     // }
                    // }}
                    onBlur={() => combobox.closeDropdown()}
                    rightSection={loading && <Loader size={18} />}
                />
            </Combobox.Target>

            <Combobox.Dropdown hidden={data === null}>
                <Combobox.Options>
                    {options}
                    {empty && <Combobox.Empty>No results found</Combobox.Empty>}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}

export default DynamicAutoComplete