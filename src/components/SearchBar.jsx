import React, { useState } from 'react'
import iconHouse from '/Vector (1).png'
import { AppBar, Box, Button, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, TextField, Toolbar, Typography } from '@mui/material'
import status from '/car-key 1.png'
import price from '/price 1.png'
import advanced from '/setting-lines.png'
import search from '/001-loupe.png';
import { useTranslation } from 'react-i18next';

const searchIcon = <img src={search} alt="" />;
const advIcon = <img src={advanced} alt="" />;
const priceIcon = <img src={price} alt="" />;
const statusIcon = <img src={status} alt="" />;

function SearchBar() {
  const { t } = useTranslation()
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("")
  const [rooms, setRooms] = useState("")
  const [size, setSize] = useState("")
  const [sort, setSort] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [advanced, setAdvanced] = useState(false)

  return (
    <div>
      <div className='container mx-auto my-3 flex justify-between gap-4'>
        <div className='border border-sky-500 flex gap-3.5 p-3 flex-1'>
          <img src={iconHouse} alt="" className='w-[30px]' />
          <input type="text" className='outline-0 text-black flex-1' placeholder={t('placeholder')} />
        </div>

        <div className={`flex gap-3 ${advanced ? "hidden" : ""}`}>
          <Button startIcon={statusIcon} variant="outlined" sx={{ color: "black" }}>
            {t("status")}
          </Button>
          <Button startIcon={priceIcon} variant="outlined" sx={{ color: "black" }}>
            {t("price")}
          </Button>
        </div>

        <Button startIcon={advIcon} variant={advanced ? "contained" : "outlined"} sx={{ color: 'black', backgroundColor: `${advanced ? 'rgba(198, 207, 240, 0.8)' : ""}` }} onClick={() => setAdvanced(v => !v)}>{t('advanced')}</Button>
        <Button startIcon={searchIcon} sx={{ paddingX: 6 }} variant='contained'>{t('search')}</Button>
      </div>

      <Box className={`relative container mx-auto items-end mt-2 ${advanced ? "" : "hidden"}`}>
        <Box sx={{ maxWidth: 800, position: 'absolute', right: 0, border: 2, borderRadius: 2 }}>
          <Box sx={{paddingX:5, paddingY:3}}>
            <Typography variant="subtitle1" mb={2} color='black' fontWeight={800}>{t("address")}</Typography>

            <Grid container spacing={2}>
              <Grid>
                <FormControl fullWidth sx={{ minWidth: 200 }}>
                  <InputLabel id="region-label" className=''>{t("region")}</InputLabel>
                  <Select
                    labelId="region-label"
                    id="region"
                    value={region}
                    label={t("region")}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    <MenuItem value="fergana">Fergana</MenuItem>
                    <MenuItem value="tashkent">Tashkent</MenuItem>
                    <MenuItem value="samarkand">Samarkand</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid>
                <FormControl fullWidth sx={{ minWidth: 200 }}>
                  <InputLabel id="city-label">{t("city")}</InputLabel>
                  <Select
                    labelId="city-label"
                    id="city"
                    value={city}
                    label={t("city")}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <MenuItem value="fergana">Fergana</MenuItem>
                    <MenuItem value="tashkent">Margilon</MenuItem>
                    <MenuItem value="samarkand">Toshloq</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid>
                <TextField
                  variant="outlined"
                  label={t("zipcode")}
                  placeholder={t("zipcodePlaceholder")}
                  inputMode="numeric"
                />
              </Grid>
            </Grid>

            <Typography variant="subtitle1" mb={2} color='black' marginTop={3} fontWeight={800}>{t("apartment_info")}</Typography>

            <Grid container spacing={2}>
              <Grid>
                <FormControl fullWidth sx={{ minWidth: 200 }}>
                  <InputLabel id="rooms-label" className=''>{t("rooms")}</InputLabel>
                  <Select
                    labelId="rooms-label"
                    id="rooms"
                    value={rooms}
                    label={t("rooms")}
                    onChange={(e) => setRooms(e.target.value)}
                  >
                    <MenuItem value="fergana">Fergana</MenuItem>
                    <MenuItem value="tashkent">Tashkent</MenuItem>
                    <MenuItem value="samarkand">Samarkand</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid>
                <FormControl fullWidth sx={{ minWidth: 200 }}>
                  <InputLabel id="size-label">{t("size")}</InputLabel>
                  <Select
                    labelId="size-label"
                    id="size"
                    value={size}
                    label={t("size")}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    <MenuItem value="fergana">Fergana</MenuItem>
                    <MenuItem value="tashkent">Margilon</MenuItem>
                    <MenuItem value="samarkand">Toshloq</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid>
                <FormControl fullWidth sx={{ minWidth: 200 }}>
                  <InputLabel id="sort-label">{t("sort")}</InputLabel>
                  <Select
                    labelId="sort-label"
                    id="sort"
                    value={sort}
                    label={t("sort")}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <MenuItem value="fergana">Fergana</MenuItem>
                    <MenuItem value="tashkent">Margilon</MenuItem>
                    <MenuItem value="samarkand">Toshloq</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Typography variant="subtitle1" mb={2} color='black' marginTop={3} fontWeight={800}>{t("price")}</Typography>

            <Grid container spacing={2}>

              <Grid>
                <FormControl fullWidth sx={{ minWidth: 200 }}>
                  <InputLabel id="minPrice-label">{t("minPrice")}</InputLabel>
                  <Select
                    labelId="minPrice-label"
                    id="minPrice"
                    value={minPrice}
                    label={t("minPrice")}
                    onChange={(e) => setMinPrice(e.target.value)}
                  >
                    <MenuItem value="fergana">Fergana</MenuItem>
                    <MenuItem value="tashkent">Margilon</MenuItem>
                    <MenuItem value="samarkand">Toshloq</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid>
                <FormControl fullWidth sx={{ minWidth: 200 }}>
                  <InputLabel id="maxPrice-label">{t("maxPrice")}</InputLabel>
                  <Select
                    labelId="maxPrice-label"
                    id="maxPrice"
                    value={maxPrice}
                    label={t("maxPrice")}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  >
                    <MenuItem value="fergana">Fergana</MenuItem>
                    <MenuItem value="tashkent">Margilon</MenuItem>
                    <MenuItem value="samarkand">Toshloq</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Box className="flex justify-end gap-3.5 w-full bg-gray-100" paddingY={4} marginTop={2} sx={{ px: 5 }}>
            <Button variant='outlined'>{t('cancel')}</Button>
            <Button variant='contained'>{t('submit')}</Button>
          </Box>
        </Box>
      </Box>


    </div>
  )
}

export default SearchBar