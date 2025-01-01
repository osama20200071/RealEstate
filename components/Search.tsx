import icons from "@/constants/icons";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { useState } from "react";
import { View, TextInput, Image, TouchableOpacity } from "react-native";
import { useDebouncedCallback } from "use-debounce";

type SearchProps = {
  className?: string;
};
const Search = ({ className }: SearchProps) => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>(); // we edit the search params our self so we define it's type
  const [search, setSearch] = useState(params.query || "");

  // useEffect(() => {
  //   console.log(params.query);
  //   console.log(search);
  //   console.log(path);
  // }, [params.query, search]);

  // debouncing the search function
  const debouncedSearch = useDebouncedCallback(
    (text: string) => router.setParams({ query: text }),
    500 // wait for 500ms before updating the search query
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    debouncedSearch(value);
  };
  return (
    <View
      className={`flex flex-row items-center justify-between gap-2 w-full px-4 py-2 border border-primary-100 rounded-md bg-accent-100 ${className}`}
    >
      <View className="flex flex-1 flex-row items-center gap-2 z-50">
        <Image source={icons.search} className="size-5 " />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything"
          className="text-base font-rubik text-black-300  flex-1 "
        />
      </View>
      <TouchableOpacity>
        <Image source={icons.filter} className="size-5" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
