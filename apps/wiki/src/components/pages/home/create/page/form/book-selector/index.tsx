import {ComboSelect, ComboSelectOptionProps, ComboSelectProps} from "@easykit/design";
import {FC, useCallback, useEffect, useMemo, useState} from "react";
import debounce from "lodash/debounce";
import {list} from "@/rest/book";
import {Book} from "@/types/pages/book";

export type BookSelectorProps = ComboSelectProps;

export const BookSelector: FC<BookSelectorProps> = (props) => {
    const [result, setResult] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const options = useMemo<ComboSelectOptionProps<Book>[]>(() => {
        return result.map((book) => ({
            raw: book,
            value: book.path,
            label: book.name
        }));
    }, [result]);

    const onSearch = useCallback(debounce(async (value: string) => {
        const {success, data} = await list({
            type: "all",
            keyword: value,
            page: 1,
            size: 100
        });
        setLoading(false);
        if(success) {
            setResult(data?.data || []);
        }else{
            setResult([]);
        }
    }, 500), []);

    useEffect(() => {
        onSearch("")?.then();
    }, [onSearch]);

    return <ComboSelect
        {...props}
        options={options}
        loading={loading}
        placeholder={"请选择"}
        className={"w-full"}
        search={true}
        filter={(value, search) =>
            options.filter((option) =>
                (option.label as string).includes(search)).length}
        onSearch={(value) => {
            setLoading(true);
            setResult([]);
            onSearch(value)?.then();
        }}
    />
}
