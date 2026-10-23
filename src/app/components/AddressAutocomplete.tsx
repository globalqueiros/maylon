"use client";

import { useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { MapPin } from "lucide-react";

type AddressAutocompleteProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    required?: boolean;
};

export default function AddressAutocomplete({
    value,
    onChange,
    placeholder,
    required = false,
}: AddressAutocompleteProps) {
    const autocompleteRef =
        useRef<google.maps.places.Autocomplete | null>(
            null
        );

    const handleLoad = (
        autocomplete: google.maps.places.Autocomplete
    ) => {
        autocompleteRef.current = autocomplete;
    };

    const handlePlaceChanged = () => {
        const autocomplete =
            autocompleteRef.current;

        if (!autocomplete) {
            return;
        }

        const place =
            autocomplete.getPlace();

        if (!place.formatted_address) {
            return;
        }

        onChange(
            place.formatted_address
        );
    };

    return (
        <div className="relative">
            <MapPin
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 z-20 -translate-y-1/2 text-[#35a989]"
            />

            <Autocomplete
                onLoad={handleLoad}
                onPlaceChanged={
                    handlePlaceChanged
                }
                options={{
                    componentRestrictions: {
                        country: "br",
                    },
                    fields: [
                        "formatted_address",
                        "geometry",
                        "name",
                        "place_id",
                    ],
                    types: ["address"],
                }}
            >
                <input
                    required={required}
                    type="text"
                    value={value}
                    onChange={(event) =>
                        onChange(
                            event.target.value
                        )
                    }
                    placeholder={placeholder}
                    autoComplete="off"
                    className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#35a989] focus:bg-white focus:ring-4 focus:ring-[#35a989]/10"
                />
            </Autocomplete>
        </div>
    );
}