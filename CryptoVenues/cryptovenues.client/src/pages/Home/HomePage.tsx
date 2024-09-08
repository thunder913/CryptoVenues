import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHelper from "../../helpers/AuthHelper";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { GET_CATEGORY_VENUES_QUERY, GET_VENUE_CATEGORIES_QUERY } from "../../queries";
import Select, { StylesConfig } from "react-select";
import VenueTable, { Venue } from "../../Components/VenuesTable";

interface OptionType {
    value: string;
    label: string;
}

export default function HomePage() {
    const navigate = useNavigate();
    const [getVenueCategories] = useLazyQuery(GET_VENUE_CATEGORIES_QUERY)
    const [categories, setCategories] = useState<OptionType[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<OptionType | null>(null);

    const logOutEvent = () => {
        AuthHelper.clearUserSession(navigate);
    };

    const fetchCategories = async () => {
        try {
            const { data } = await getVenueCategories();

            if (data == undefined)
                return;

            const categories = data.allVenueCategories.map((v: { name: any; }) => v.name);

            const optionCategories = categories.map((v: { name: string }) => ({
                value: v,
                label: v,
            }))


            setCategories(optionCategories)

            setIsLoading(false);
        }
        catch (error) {
            if (error instanceof ApolloError) {
                console.error('GraphQL errors:', error.graphQLErrors);
                console.error('Network error:', error.networkError);
            } else {
                console.error('Error:', error);
            }
        }
    };

    // Check if user already logged in
    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        const jwtTokenExpiry = localStorage.getItem('jwtTokenExpiry');

        if (jwtToken == undefined || jwtToken == null || jwtToken == "" ||
            jwtTokenExpiry == undefined || jwtTokenExpiry == null || jwtTokenExpiry == "") {
            navigate('/signIn');
            return;
        }

        const dateNow = new Date();
        if ((BigInt(jwtTokenExpiry) - 621355968000000000n) / 10000n < dateNow.getTime()) {
            logOutEvent();
            return;
        }

        fetchCategories();
    }, []);

    const handleSelectChange = (selectedOption: { value: string; label: string } | null) => {
        setSelectedCategory(selectedOption);
    };

    const customStyles: StylesConfig<OptionType, false> = {
        option: (provided) => ({
            ...provided,
            color: 'black',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'black',
        }),
    };


    return isLoading ? (
        <div className="loading">
            <p>Venues are loading, please wait...</p>
        </div>
    ) : (
        <div>
            <section className="venues">
                <div>
                    <label htmlFor="venueCategorySelect">Choose a venue category:</label>
                    <Select
                        id="venueCategorySelect"
                        options={categories}
                        onChange={handleSelectChange}
                        placeholder="Select a category"
                        value={selectedCategory}
                        isClearable={true}
                        isSearchable={true}
                        isLoading={isLoading}
                        styles={customStyles}
                    />
                </div>
                {selectedCategory ? <VenueTable
                    selectedCategory={selectedCategory.value}
                /> : <></>}
            </section>
            <button
                className="logout"
                onClick={() => logOutEvent()}>
                Logout
            </button>
        </div >
    )
}