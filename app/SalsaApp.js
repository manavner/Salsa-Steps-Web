'use client';
import { useState, useEffect, useRef, useMemo } from 'react';

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQwXCQ2XoXYp3LdTuisNkzp9MLavv30da1ZaOC53PJvrnr6qTNShAIOthkEJ6x9jjHPoiYUNu6XV0Vi/pub?output=csv';

const EMBEDDED_DATA = [{"level": "Beginners", "stepName": "Siete", "originalCount": "1", "type": "Free", "link": "http://www.youtube.com/watch?v=XKtt8CB7J3M"}, {"level": "Intermediate", "stepName": "Vacilala aquesta la", "originalCount": "1", "type": "Free", "link": ""}, {"level": "Beginners", "stepName": "Vacilala", "originalCount": "2", "type": "Free", "link": "http://www.youtube.com/watch?v=I0EJMHecG_0"}, {"level": "Beginners", "stepName": "Fly", "originalCount": "1", "type": "Rueda", "link": "http://www.youtube.com/watch?v=RACdB7KIpqU"}, {"level": "Beginners", "stepName": "Tiempo espania", "originalCount": "1", "type": "Free", "link": "https://www.youtube.com/watch?v=wl0jwLo5bLc"}, {"level": "Beginners", "stepName": "Taro de mentira", "originalCount": "1", "type": "Tiempo espania", "link": "http://www.youtube.com/watch?v=0HLxJfzcPV4"}, {"level": "Beginners", "stepName": "Taro con manos", "originalCount": "1", "type": "Tiempo espania", "link": "https://www.youtube.com/watch?v=K2g-dJlC90I"}, {"level": "Beginners", "stepName": "Taro", "originalCount": "1", "type": "Tiempo espania", "link": "http://www.youtube.com/watch?v=tCnZZHEfbQI"}, {"level": "Beginners", "stepName": "Sombrero", "originalCount": "2", "type": "Free", "link": "http://www.youtube.com/watch?v=Y0U309VrG2w"}, {"level": "Beginners", "stepName": "exhibala", "originalCount": "1", "type": "Free", "link": "http://www.youtube.com/watch?v=QLWeMZ6SoR4"}, {"level": "Beginners", "stepName": "Sacala", "originalCount": "1", "type": "Free", "link": "http://www.youtube.com/watch?v=QLWeMZ6SoR4"}, {"level": "Beginners", "stepName": "Prima", "originalCount": "2", "type": "Free", "link": "http://www.youtube.com/watch?v=X44m1VUtV9g"}, {"level": "Beginners", "stepName": "Paseala", "originalCount": "1", "type": "Free", "link": "https://www.youtube.com/watch?v=VZTApqT-qR0"}, {"level": "Beginners", "stepName": "Para el medio", "originalCount": "1", "type": "Tiempo espania", "link": "https://www.youtube.com/watch?v=H5OPu50Ih_Y"}, {"level": "Beginners", "stepName": "Para abajo", "originalCount": "1", "type": "Tiempo espania", "link": "https://www.youtube.com/watch?v=DoRldDMHUZw"}, {"level": "Beginners", "stepName": "Palmas", "originalCount": "1", "type": "Rueda", "link": "http://www.youtube.com/watch?v=vVKqne5_7J0"}, {"level": "Beginners", "stepName": "Miami", "originalCount": "2", "type": "Free", "link": "http://www.youtube.com/watch?v=YwGzyrABKlE"}, {"level": "Beginners", "stepName": "Lento", "originalCount": "2", "type": "Free", "link": "http://www.youtube.com/watch?v=yqVwoeJ54g0"}, {"level": "Beginners", "stepName": "Laso", "originalCount": "1", "type": "Free", "link": "https://www.youtube.com/watch?v=xYvHcA5u0WI"}, {"level": "Beginners", "stepName": "Kentucky", "originalCount": "3", "type": "Free", "link": "http://www.youtube.com/watch?v=1IrFrFKKkeI"}, {"level": "Beginners", "stepName": "Guapea", "originalCount": "1", "type": "Free", "link": "https://www.youtube.com/watch?v=fk_H8_pvr4w"}, {"level": "Beginners", "stepName": "Fly Doble", "originalCount": "1", "type": "Free", "link": "http://www.youtube.com/watch?v=UlN_2EXfF1A"}, {"level": "Beginners", "stepName": "Exhibela", "originalCount": "1", "type": "Free", "link": "http://www.youtube.com/watch?v=QLWeMZ6SoR4"}, {"level": "Beginners", "stepName": "Enchufla Doble", "originalCount": "3", "type": "Free", "link": "https://www.youtube.com/watch?v=JswM_OUf2zA"}, {"level": "Intermediate", "stepName": "Enchufla aquesta la", "originalCount": "1", "type": "Free", "link": ""}, {"level": "Beginners", "stepName": "Enchufla", "originalCount": "2", "type": "Free", "link": "https://www.youtube.com/watch?v=qIdSys1iE5c"}, {"level": "Beginners", "stepName": "Enchufala Y Dame", "originalCount": "2", "type": "Free", "link": "https://www.youtube.com/watch?v=A6UP2vXuAP8"}, {"level": "Beginners", "stepName": "Enchufala Vempiro", "originalCount": "3", "type": "Free", "link": "http://www.youtube.com/watch?v=F6AF1EjoyHs"}, {"level": "Beginners", "stepName": "Enchufala con Vuelta", "originalCount": "2", "type": "Free", "link": "http://www.youtube.com/watch?v=ZC2h5GybB_k"}, {"level": "Beginners", "stepName": "Enchufala Complicado", "originalCount": "3", "type": "Free", "link": "https://www.youtube.com/watch?v=CVs-VcV6FUc"}, {"level": "Beginners", "stepName": "El uno", "originalCount": "4", "type": "Free", "link": "http://www.youtube.com/watch?v=d9iNf6pm-jk"}, {"level": "Beginners", "stepName": "Directo", "originalCount": "1", "type": "Rueda", "link": "https://www.youtube.com/watch?v=TfnUsjrnb0g"}, {"level": "Beginners", "stepName": "Dile que no", "originalCount": "1", "type": "Rueda", "link": "https://www.youtube.com/watch?v=fa4EHHHFcsQ"}, {"level": "Beginners", "stepName": "Dame Con Una", "originalCount": "1", "type": "Rueda", "link": "https://www.youtube.com/watch?v=vfZUQvly2W8"}, {"level": "Beginners", "stepName": "Dame Con Tres", "originalCount": "1", "type": "Rueda", "link": "https://www.youtube.com/watch?v=kKEzg2-TD3E"}, {"level": "Beginners", "stepName": "Dame Con Dos", "originalCount": "1", "type": "Rueda", "link": "https://www.youtube.com/watch?v=ztk_R3bChZQ"}, {"level": "Beginners", "stepName": "Dame Abajo", "originalCount": "1", "type": "Rueda", "link": "https://www.youtube.com/watch?v=u3NCKWY1KVQ"}, {"level": "Beginners", "stepName": "Dame", "originalCount": "1", "type": "Rueda", "link": "https://www.youtube.com/watch?v=czwBiVX_8qM"}, {"level": "Beginners", "stepName": "Chaparia", "originalCount": "1", "type": "Free", "link": "http://www.youtube.com/watch?v=GJBzdH8sLA8"}, {"level": "Beginners", "stepName": "Candado", "originalCount": "4", "type": "Free", "link": "http://www.youtube.com/watch?v=tH5m2JgVCYc"}, {"level": "Beginners", "stepName": "Adios", "originalCount": "1", "type": "Rueda", "link": "https://www.youtube.com/watch?v=palabYHmKns"}, {"level": "Intermediate", "stepName": "Three way stop", "originalCount": "3", "type": "Free", "link": "https://www.youtube.com/watch?v=j6Di28x1RjI"}, {"level": "Intermediate", "stepName": "Siete Moderno", "originalCount": "2", "type": "Free", "link": "http://www.youtube.com/watch?v=YFVtFvu7GTk"}, {"level": "Intermediate", "stepName": "Siete doble", "originalCount": "2", "type": "Free", "link": "http://www.youtube.com/watch?v=DWgF777lX4Y"}, {"level": "Intermediate", "stepName": "Siete Coca Cola", "originalCount": "2", "type": "Free", "link": "http://www.youtube.com/watch?v=73STWQdEE7M"}, {"level": "Intermediate", "stepName": "Setenta y Cinco", "originalCount": "3", "type": "Free", "link": "http://www.youtube.com/watch?v=X2DyBUaCZ8g"}, {"level": "Intermediate", "stepName": "Setenta Complicado", "originalCount": "4", "type": "Free", "link": "http://www.youtube.com/watch?v=iBhFE1XJu2Q"}, {"level": "Intermediate", "stepName": "Setenta", "originalCount": "4", "type": "Free", "link": "http://www.youtube.com/watch?v=fxcXu6gmyu8"}, {"level": "Intermediate", "stepName": "Rueda de Tiempo España (Taro)", "originalCount": "1", "type": "Tiempo espania", "link": "http://www.youtube.com/watch?v=tCnZZHEfbQI"}, {"level": "Intermediate", "stepName": "Prima con la Hermana", "originalCount": "3", "type": "Free", "link": "http://www.youtube.com/watch?v=iWJDuhiVs-E"}, {"level": "Intermediate", "stepName": "Ocho", "originalCount": "2", "type": "Hombres el centro", "link": "https://www.youtube.com/watch?v=Vk3XDh4k_Q8"}, {"level": "Intermediate", "stepName": "Ochenta", "originalCount": "3", "type": "Hombres el centro", "link": "https://www.youtube.com/watch?v=PuB34PS0-5w"}, {"level": "Intermediate", "stepName": "Montana", "originalCount": "4", "type": "Free", "link": "http://www.youtube.com/watch?v=eWHH4JYQe_o"}, {"level": "Intermediate", "stepName": "La pelota", "originalCount": "1", "type": "Free", "link": "https://www.youtube.com/watch?v=7MFz-fyMhPs"}, {"level": "Intermediate", "stepName": "Hombres el centro", "originalCount": "1", "type": "Hombres el centro", "link": "https://www.youtube.com/watch?v=joxuPhdcw6Q"}, {"level": "Intermediate", "stepName": "Havana", "originalCount": "6", "type": "Free", "link": "http://www.youtube.com/watch?v=QsezvdEgPkE"}, {"level": "Intermediate", "stepName": "Flamenco", "originalCount": "3", "type": "Free", "link": "https://www.youtube.com/watch?v=geb756OHGFA"}, {"level": "Intermediate", "stepName": "Festival Prima", "originalCount": "11", "type": "Free", "link": "http://www.youtube.com/watch?v=fcLxYzdqjrc"}, {"level": "Intermediate", "stepName": "Festival Bueno Malo", "originalCount": "6", "type": "Rueda", "link": "https://www.youtube.com/watch?v=yZ8bT8zAMJ0"}, {"level": "Intermediate", "stepName": "Festival Balagan", "originalCount": "9", "type": "Rueda", "link": "https://www.youtube.com/watch?v=MY_YF-V7usg"}, {"level": "Intermediate", "stepName": "Evelin", "originalCount": "2", "type": "Free", "link": "https://www.youtube.com/watch?v=6m0EuDJu_As"}, {"level": "Intermediate", "stepName": "Enchufala con chufala", "originalCount": "3", "type": "Rueda", "link": "https://www.youtube.com/watch?v=0tuCW9oxx_Y"}, {"level": "Intermediate", "stepName": "Enchufala Coca Cola", "originalCount": "3", "type": "Free", "link": "https://www.youtube.com/watch?v=ZPVka4OtBeg"}, {"level": "Intermediate", "stepName": "El Dos", "originalCount": "5", "type": "Free", "link": "https://www.youtube.com/watch?v=mS2JqDNt8sY"}, {"level": "Intermediate", "stepName": "Dos Con Dos", "originalCount": "1", "type": "Free", "link": "https://www.youtube.com/watch?v=sRAZmtcBlAw&list=PL8hFYIpg2Jp0aIIUjOAljXCmX7kz-rXyp"}, {"level": "Intermediate", "stepName": "Derecha", "originalCount": "1", "type": "Hombres el centro", "link": "https://www.youtube.com/watch?v=AzbztZBlmoo"}, {"level": "Intermediate", "stepName": "Dedo", "originalCount": "4", "type": "Free", "link": "http://www.youtube.com/watch?v=P3yusJNVslo"}, {"level": "Intermediate", "stepName": "Cero", "originalCount": "1", "type": "Hombres el centro", "link": "https://www.youtube.com/watch?v=rflTICyo7is"}, {"level": "Intermediate", "stepName": "Beso", "originalCount": "4", "type": "Free", "link": "http://www.youtube.com/watch?v=8QXhay26TIU"}, {"level": "Intermediate", "stepName": "Babosa", "originalCount": "3", "type": "Rueda", "link": "https://www.youtube.com/watch?v=E-zgOoRwYIE"}, {"level": "Intermediate", "stepName": "Atrevido", "originalCount": "2", "type": "Free", "link": "https://www.youtube.com/watch?v=Jcq-3fCdEc4"}, {"level": "Intermediate", "stepName": "Adios Arriba", "originalCount": "2", "type": "Rueda", "link": "https://www.youtube.com/watch?v=zFe6w9wFmcI"}, {"level": "Intermediate", "stepName": "Abrazala", "originalCount": "4", "type": "Free", "link": "http://www.youtube.com/watch?v=8QKVjRIbxbY"}, {"level": "Intermediate", "stepName": "Palmas", "originalCount": "1", "type": "Free", "link": "https://www.youtube.com/watch?v=vVKqne5_7J0"}, {"level": "Intermediate", "stepName": "Sombrero televisia", "originalCount": "1", "type": "Free", "link": ""}, {"level": "Intermediate", "stepName": "Vacilala entrada", "originalCount": "3", "type": "Free", "link": "https://www.youtube.com/watch?v=kBB1YE2E7vM"}, {"level": "Intermediate", "stepName": "Trienta y tres", "originalCount": "3", "type": "Free", "link": "https://www.youtube.com/watch?v=4EtKcVnmOVM"}, {"level": "Intermediate", "stepName": "Sombrero y laso", "originalCount": "3", "type": "Free", "link": "https://www.youtube.com/watch?v=EMMMdJqtmpM"}, {"level": "Intermediate", "stepName": "Lento aquesta la", "originalCount": "1", "type": "Free", "link": ""}, {"level": "Intermediate", "stepName": "Dedo Guarapo y Bota", "originalCount": "3", "type": "Free", "link": "https://www.youtube.com/watch?v=xzDEE6aXL9o"}, {"level": "Intermediate", "stepName": "Dame de Mentira", "originalCount": "2", "type": "Free", "link": "https://www.youtube.com/watch?v=7An2LmjWjHo"}, {"level": "Intermediate", "stepName": "Coco y Coquito", "originalCount": "2", "type": "Tiempo espania", "link": "https://www.youtube.com/watch?v=fut0N6MX1iQ"}, {"level": "Intermediate", "stepName": "Coca-Cola", "originalCount": "2", "type": "Free", "link": "http://www.youtube.com/watch?v=LM43cc7OhBs"}, {"level": "Intermediate", "stepName": "Balsero", "originalCount": "4", "type": "Free", "link": "https://www.youtube.com/watch?v=wuToHoNijqQ"}, {"level": "Intermediate", "stepName": "Abanico", "originalCount": "2", "type": "Free", "link": "https://www.youtube.com/watch?v=6BAGfZS0dPE"}, {"level": "Advanced", "stepName": "Trompo", "originalCount": "6", "type": "Free", "link": "https://www.youtube.com/watch?v=MAUjuo71jB0"}, {"level": "Advanced", "stepName": "Thalia", "originalCount": "6", "type": "Free", "link": "https://www.youtube.com/watch?v=cThYwpFWbyQ"}, {"level": "Advanced", "stepName": "Sombrero por debajo complicado", "originalCount": "8", "type": "Free", "link": "https://www.youtube.com/watch?v=zik0vGLEkmE"}, {"level": "Advanced", "stepName": "Sombrero por Debajo", "originalCount": "4", "type": "Free", "link": "https://www.youtube.com/watch?v=KWRm1gTj1Xg"}, {"level": "Advanced", "stepName": "Sombrero Doble", "originalCount": "4", "type": "Free", "link": "https://www.youtube.com/watch?v=WSYNp3iu1ks"}, {"level": "Advanced", "stepName": "Sombrero de Regnier", "originalCount": "7", "type": "Free", "link": "https://www.youtube.com/watch?v=lfm2QGgO9VQ"}, {"level": "Advanced", "stepName": "Sombrero de Manny", "originalCount": "5", "type": "Free", "link": "https://www.youtube.com/watch?v=-Tp4eI0kWrY"}, {"level": "Advanced", "stepName": "Sombra", "originalCount": "2", "type": "Rueda", "link": "https://www.youtube.com/watch?v=tglU8IswgeM"}, {"level": "Advanced", "stepName": "Siete Setenta", "originalCount": "5", "type": "Free", "link": "https://www.youtube.com/watch?v=GK03gkoTeGw"}, {"level": "Advanced", "stepName": "Siete Loco", "originalCount": "5", "type": "Free", "link": "http://www.youtube.com/watch?v=2ac45ElWQfY"}, {"level": "Advanced", "stepName": "Setenta Nuevo", "originalCount": "4", "type": "Free", "link": "https://www.youtube.com/watch?v=ccpDxJsrOns"}, {"level": "Advanced", "stepName": "Setenta con setenta", "originalCount": "6", "type": "Free", "link": "https://www.youtube.com/watch?v=eQJ7XesUNFQ"}, {"level": "Advanced", "stepName": "Rubenada", "originalCount": "6", "type": "Free", "link": "https://www.youtube.com/watch?v=WYMG6S7lofY&list=PLD9CA9B81A0346EB3&index=14"}, {"level": "Advanced", "stepName": "Puente pitria", "originalCount": "6", "type": "Free", "link": "https://www.youtube.com/watch?v=qJAV6NhI42M"}, {"level": "Advanced", "stepName": "Puente", "originalCount": "4", "type": "Free", "link": "https://www.youtube.com/watch?v=QLj6hTsQ4Og"}, {"level": "Advanced", "stepName": "Prima con Paulito", "originalCount": "3", "type": "Free", "link": "http://www.youtube.com/watch?v=6uvgc3zm9pM"}, {"level": "Advanced", "stepName": "Ponle sabor", "originalCount": "7", "type": "Free", "link": "https://www.youtube.com/watch?v=uFQehTqZfPg"}, {"level": "Advanced", "stepName": "Paseala por el Parque", "originalCount": "8", "type": "Free", "link": "https://www.youtube.com/watch?v=THycmrMHE24"}, {"level": "Advanced", "stepName": "Noventa", "originalCount": "8", "type": "Free", "link": "https://www.youtube.com/watch?v=HcnWjZryHGI"}, {"level": "Advanced", "stepName": "Mona lisa", "originalCount": "5", "type": "Free", "link": "https://www.youtube.com/watch?v=f243iSKiFFk"}, {"level": "Advanced", "stepName": "La Jenny", "originalCount": "7", "type": "Free", "link": "https://www.youtube.com/watch?v=56IOwturFRU"}, {"level": "Advanced", "stepName": "La Cuadra", "originalCount": "11", "type": "Free", "link": "https://www.youtube.com/watch?v=i65YoIiy9CY"}, {"level": "Advanced", "stepName": "Kentucky Complicado", "originalCount": "10", "type": "Free", "link": "https://www.youtube.com/watch?v=mB7JViSgjh8&list=PLD9CA9B81A0346EB3&index=3"}, {"level": "Advanced", "stepName": "Juana la Cubana", "originalCount": "5", "type": "Free", "link": "https://www.youtube.com/watch?v=rEUUI2-m8ow"}, {"level": "Advanced", "stepName": "Izquierda", "originalCount": "1", "type": "Hombres el centro", "link": "https://www.youtube.com/watch?v=xQuL7f4BS0Y"}, {"level": "Advanced", "stepName": "Exhibela complicado", "originalCount": "5", "type": "Free", "link": "https://www.youtube.com/watch?v=PrBYXfuBGZI"}, {"level": "Advanced", "stepName": "Esquipi la prima forma", "originalCount": "3", "type": "Rueda", "link": "http://www.youtube.com/watch?v=CV9ioQsNBJs"}, {"level": "Advanced", "stepName": "Esquipi con amisted", "originalCount": "6", "type": "Rueda", "link": "https://www.youtube.com/watch?v=17RY54Ry_Ps"}, {"level": "Advanced", "stepName": "Espresso", "originalCount": "3", "type": "Rueda", "link": "https://www.youtube.com/watch?v=F0Cd7XQek2A&list=PLVhMZqStoOF5t99d9wsfTZ8YGr5Of0vBb&index=98"}, {"level": "Advanced", "stepName": "Enchufala y Cadeneta", "originalCount": "10", "type": "Free", "link": "https://www.youtube.com/watch?v=Qx6QmWenEyo"}, {"level": "Advanced", "stepName": "Enchufala con Rueda a la Reves", "originalCount": "1", "type": "Free", "link": "https://www.youtube.com/watch?v=pamRGLTIq7g"}, {"level": "Advanced", "stepName": "El Uno Complicado", "originalCount": "14", "type": "Free", "link": "https://www.youtube.com/watch?v=kAayCfzV10g"}, {"level": "Advanced", "stepName": "El Suave", "originalCount": "5", "type": "Free", "link": "https://www.youtube.com/watch?v=XNIMai8rtdw"}, {"level": "Advanced", "stepName": "El Melao", "originalCount": "6", "type": "Free", "link": "https://www.youtube.com/watch?v=N1_qpOY9r7M"}, {"level": "Advanced", "stepName": "El doce", "originalCount": "12", "type": "Free", "link": "https://www.youtube.com/watch?v=3E8d2AN8I34"}, {"level": "Advanced", "stepName": "Dedo Saboreado", "originalCount": "6", "type": "Free", "link": "https://www.youtube.com/watch?v=0imJRB-Jp9A"}, {"level": "Advanced", "stepName": "Dedo de Lazaro", "originalCount": "13", "type": "Free", "link": "https://www.youtube.com/watch?v=AXhtq6WLoNs"}, {"level": "Advanced", "stepName": "Dedo Complicado", "originalCount": "4", "type": "Free", "link": "https://www.youtube.com/watch?v=mLsCv_Ha8mQ"}, {"level": "Advanced", "stepName": "Dedo complicado", "originalCount": "6", "type": "Free", "link": "https://www.youtube.com/watch?v=SRFnntXKunA"}, {"level": "Advanced", "stepName": "Coquito", "originalCount": "8", "type": "Free", "link": "https://www.youtube.com/watch?v=I-Qhdh6j4HQ"}, {"level": "Advanced", "stepName": "Colon con amiga", "originalCount": "6", "type": "Free", "link": "https://www.youtube.com/watch?v=ta3wNp6CALo"}, {"level": "Advanced", "stepName": "Colon", "originalCount": "6", "type": "Free", "link": "https://www.youtube.com/watch?v=l5gjv49kz4c"}, {"level": "Advanced", "stepName": "Cadena", "originalCount": "3", "type": "Rueda", "link": "https://www.youtube.com/watch?v=tzYOzT6mV9Y"}, {"level": "Advanced", "stepName": "Cabeza de pescado", "originalCount": "6", "type": "Free", "link": "https://www.youtube.com/watch?v=eQJ7XesUNFQ"}, {"level": "Advanced", "stepName": "Beso por Debajo", "originalCount": "7", "type": "Free", "link": "https://www.youtube.com/watch?v=is5lspyc7iw"}, {"level": "Advanced", "stepName": "Beso Loco", "originalCount": "8", "type": "Free", "link": "https://www.youtube.com/watch?v=PpFqYMh55BY"}, {"level": "Advanced", "stepName": "Beso Complicado", "originalCount": "8", "type": "Free", "link": "https://www.youtube.com/watch?v=is5lspyc7iw"}, {"level": "Advanced", "stepName": "Bebe", "originalCount": "10", "type": "Free", "link": "https://www.youtube.com/watch?v=orEq6_3e59M&list=PLD9CA9B81A0346EB3&index=7"}, {"level": "Advanced", "stepName": "Balsero complicado", "originalCount": "6", "type": "Free", "link": "https://www.youtube.com/watch?v=pXxl9aJkBnM"}, {"level": "Advanced", "stepName": "Amistad", "originalCount": "5", "type": "Rueda", "link": "https://www.youtube.com/watch?v=GWH1CBe2KXE"}, {"level": "Advanced", "stepName": "Agamenon", "originalCount": "13", "type": "Free", "link": "https://www.youtube.com/watch?v=sk7g2jLrjGs&t=4s"}, {"level": "Advanced", "stepName": "Abanico complicado", "originalCount": "5", "type": "Free", "link": "https://www.youtube.com/watch?v=ZHz_7js8Hko&list=PL82A94473A5134D2F&index=9"}, {"level": "Advanced", "stepName": "Sombrero Por Debajo Complicado", "originalCount": "6", "type": "Free", "link": "https://www.youtube.com/watch?v=824hwtPzsM0"}, {"level": "Advanced", "stepName": "Sombrero de Guano", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=TtqwR6EmCzU&list=RDTtqwR6EmCzU&start_radio=1"}, {"level": "Intermediate", "stepName": "Abanico", "originalCount": "2", "type": "Free", "link": "https://www.youtube.com/watch?v=if-8wCtCpi8"}, {"level": "Advanced", "stepName": "Colon", "originalCount": "6", "type": "Free", "link": "https://www.youtube.com/watch?v=1QqBR5eFqe8"}, {"level": "Intermediate", "stepName": "Prima Press Rotation", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=DJAOo27sHXg"}, {"level": "Intermediate", "stepName": "El Dos", "originalCount": "5", "type": "Free", "link": "https://www.youtube.com/watch?v=FXZrv_8HWmw"}, {"level": "Intermediate", "stepName": "El Uno Magniv", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=vf_ql2e7NQk"}, {"level": "Beginners", "stepName": "Siete", "originalCount": "1", "type": "Free", "link": "https://www.youtube.com/watch?v=ri5wYDgAsb8"}, {"level": "Intermediate", "stepName": "Setenta", "originalCount": "4", "type": "Free", "link": "https://www.youtube.com/watch?v=srEdYnTbv0k"}, {"level": "Advanced", "stepName": "Enchufala con Rueda a la Reves", "originalCount": "1", "type": "Free", "link": "https://www.youtube.com/watch?v=kMFrYNx1ZPA"}, {"level": "Advanced", "stepName": "Trompo", "originalCount": "6", "type": "Free", "link": "https://www.youtube.com/watch?v=VXLGrB6HLFw"}, {"level": "Intermediate", "stepName": "Avioneta", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=OGliS0In9ro"}, {"level": "Intermediate", "stepName": "Evelin", "originalCount": "2", "type": "Free", "link": "https://www.youtube.com/watch?v=zZlRa176QnY"}, {"level": "Intermediate", "stepName": "Chiwawa", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=_W_QL3ZFOJc"}, {"level": "Advanced", "stepName": "Noventa", "originalCount": "8", "type": "Free", "link": "https://www.youtube.com/watch?v=Ez2YHMovv3E"}, {"level": "Beginners", "stepName": "Vueltas", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=Qk3HQ08s24I"}, {"level": "Advanced", "stepName": "Setenta y Cinco Complicado", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=zm1t5Wytl6U"}, {"level": "Intermediate", "stepName": "Botala", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=6taEVDw5lfg"}, {"level": "Advanced", "stepName": "Setenta y Nueve", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=5AcssxpBPco"}, {"level": "Advanced", "stepName": "La Jenny", "originalCount": "7", "type": "Free", "link": "https://www.youtube.com/watch?v=H6LVfGfn-78"}, {"level": "Advanced", "stepName": "La May", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=ZaufqtRL3OM"}, {"level": "Advanced", "stepName": "Dosientos", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=NCKStdz4Ukw"}, {"level": "Intermediate", "stepName": "Chaparia Doble", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=z1R0NX5WOzU"}, {"level": "Beginners", "stepName": "Chaparia", "originalCount": "1", "type": "Free", "link": "https://www.youtube.com/watch?v=AUfcXbJoDQM"}, {"level": "Advanced", "stepName": "Ponle sabor", "originalCount": "7", "type": "Free", "link": "https://www.youtube.com/watch?v=_OgIogoizMQ"}, {"level": "Advanced", "stepName": "El Uno Complicado", "originalCount": "14", "type": "Free", "link": "https://www.youtube.com/watch?v=i9oyPp2ZKX0"}, {"level": "Advanced", "stepName": "Ocho Complicado", "originalCount": "", "type": "Hombres el centro", "link": "https://www.youtube.com/watch?v=scpQXVHOnzw"}, {"level": "Intermediate", "stepName": "Ocho", "originalCount": "2", "type": "Hombres el centro", "link": "https://www.youtube.com/watch?v=TmC6jN-keJ4"}, {"level": "Beginners", "stepName": "Fin", "originalCount": "", "type": "Rueda", "link": "https://www.youtube.com/watch?v=HleaVHClaWw"}, {"level": "Advanced", "stepName": "Noventa Complicado", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=JLk_3ZmOgC4"}, {"level": "Advanced", "stepName": "Spicy", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=sfzvxXDKFIg"}, {"level": "Advanced", "stepName": "Dizziness", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=-eewpS2q9Uw"}, {"level": "Advanced", "stepName": "Doble Play + Triple Play", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=Rm8jJqKE1bY"}, {"level": "Advanced", "stepName": "La Cuadra", "originalCount": "11", "type": "Free", "link": "https://www.youtube.com/watch?v=t8_3AoiiL_M"}, {"level": "Advanced", "stepName": "El Aviado", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=TufIBO4TcJc"}, {"level": "Advanced", "stepName": "Abanico complicado", "originalCount": "5", "type": "Free", "link": "https://www.youtube.com/watch?v=Ky1G5tVhrvM"}, {"level": "Advanced", "stepName": "El Suave", "originalCount": "5", "type": "Free", "link": "https://www.youtube.com/watch?v=eZxXD07PmD8"}, {"level": "Advanced", "stepName": "El Camino", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=QI9ZZkRDlN8"}, {"level": "Advanced", "stepName": "Matrix", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=PRYUkqGb3mY"}, {"level": "Advanced", "stepName": "Atrevido Cabeza", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=lb9Kt0dN1K8"}, {"level": "Advanced", "stepName": "Sabrosura", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=2AnoY6z1DXo"}, {"level": "Advanced", "stepName": "La Bomba", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=OfH_y9lcWbk"}, {"level": "Advanced", "stepName": "Beso por Debajo", "originalCount": "7", "type": "Free", "link": "https://www.youtube.com/watch?v=_Q2f2sPr87I"}, {"level": "Advanced", "stepName": "Setenta Loco", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=6NdTw1skRog"}, {"level": "Advanced", "stepName": "Setenta Wave", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=AvbpY2Mjx5A"}, {"level": "Intermediate", "stepName": "Enchufla Abajo", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=OimcqdeZIMg"}, {"level": "Intermediate", "stepName": "Orcala", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=jc8nUIpWNis"}, {"level": "Intermediate", "stepName": "Guapea Slide", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=YZMBJsk4GGQ"}, {"level": "Intermediate", "stepName": "Dos Con Dos", "originalCount": "1", "type": "Free", "link": "https://www.youtube.com/watch?v=XgIfs5J6mv8"}, {"level": "Intermediate", "stepName": "Hombres el centro", "originalCount": "1", "type": "Hombres el centro", "link": "https://www.youtube.com/watch?v=mv2yYkPyog8"}, {"level": "Intermediate", "stepName": "La pelota", "originalCount": "1", "type": "Free", "link": "https://www.youtube.com/watch?v=mv2yYkPyog8"}, {"level": "Beginners", "stepName": "Enchufala Y Dame", "originalCount": "2", "type": "Free", "link": "https://www.youtube.com/watch?v=Y7k8XyuloRY"}, {"level": "Intermediate", "stepName": "Festival Bueno Malo", "originalCount": "6", "type": "Rueda", "link": "https://www.youtube.com/watch?v=ah6eRsBgrbU"}, {"level": "Intermediate", "stepName": "Festival Caramelo", "originalCount": "", "type": "Rueda", "link": "https://www.youtube.com/watch?v=BODGK9nNOXc"}, {"level": "Advanced", "stepName": "Paolito Por Debajo", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=1BS8PdFnnJk"}, {"level": "Beginners", "stepName": "Paseala", "originalCount": "1", "type": "Free", "link": "https://www.youtube.com/watch?v=BznEuRFOpwk"}, {"level": "Intermediate", "stepName": "Siete Magniv", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=aK7zCMrnOvM"}, {"level": "Advanced", "stepName": "Siete Loco", "originalCount": "5", "type": "Free", "link": "https://www.youtube.com/watch?v=kBedky8yoeU"}, {"level": "Advanced", "stepName": "Siete Moderno Espalda", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=Dc8Gs8jOGCw"}, {"level": "Intermediate", "stepName": "Siete Moderno", "originalCount": "2", "type": "Free", "link": "https://www.youtube.com/watch?v=YPDnM5YSHdw"}, {"level": "Advanced", "stepName": "Enchufla Coca Cola Por Atras", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=tYZBt4nYLxE"}, {"level": "Advanced", "stepName": "Mario", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=F06HpxI47IM"}, {"level": "Beginners", "stepName": "Laso", "originalCount": "1", "type": "Free", "link": "https://www.youtube.com/watch?v=y0dq2zUKI50"}, {"level": "Intermediate", "stepName": "La Pelota Loca", "originalCount": "", "type": "Hombres el centro", "link": "https://www.youtube.com/watch?v=rgg__zfo7bU"}, {"level": "Intermediate", "stepName": "Manos Tres", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=GHhN1ZXP6N4"}, {"level": "Advanced", "stepName": "Despelote", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=L5tnbOWhZ0g"}, {"level": "Beginners", "stepName": "Dame Con Una", "originalCount": "1", "type": "Rueda", "link": "https://www.youtube.com/watch?v=iB5ZlctXz7E"}, {"level": "Beginners", "stepName": "Dame Con Dos", "originalCount": "1", "type": "Rueda", "link": "https://www.youtube.com/watch?v=iB5ZlctXz7E"}, {"level": "Beginners", "stepName": "Dame Con Tres", "originalCount": "1", "type": "Rueda", "link": "https://www.youtube.com/watch?v=iB5ZlctXz7E"}, {"level": "Advanced", "stepName": "Dedo Saboreado", "originalCount": "6", "type": "Free", "link": "https://www.youtube.com/watch?v=3gzg8BdTvBk"}, {"level": "Advanced", "stepName": "Dedo Complicado", "originalCount": "4", "type": "Free", "link": "https://www.youtube.com/watch?v=pO6vUAoPgKs"}, {"level": "Beginners", "stepName": "Fly", "originalCount": "1", "type": "Rueda", "link": "https://www.youtube.com/watch?v=FfNn7orN9FA"}, {"level": "Intermediate", "stepName": "La Pelota Clave", "originalCount": "", "type": "Hombres el centro", "link": "https://www.youtube.com/watch?v=Ye6saUGo07o"}, {"level": "Beginners", "stepName": "Dame Abajo", "originalCount": "1", "type": "Rueda", "link": "https://www.youtube.com/watch?v=tTq7H1c5OzA"}, {"level": "Beginners", "stepName": "El uno", "originalCount": "4", "type": "Free", "link": "https://www.youtube.com/watch?v=YeabcooNnFM"}, {"level": "Intermediate", "stepName": "Abrazala", "originalCount": "4", "type": "Free", "link": "https://www.youtube.com/watch?v=OLIp2lc3cJk"}, {"level": "Beginners", "stepName": "Adios", "originalCount": "1", "type": "Rueda", "link": "https://www.youtube.com/watch?v=3khWERxosok"}, {"level": "Beginners", "stepName": "Enchufala con Vuelta", "originalCount": "2", "type": "Free", "link": "https://www.youtube.com/watch?v=0e8FI3auTnI"}, {"level": "Beginners", "stepName": "Taro", "originalCount": "1", "type": "Tiempo espania", "link": "https://www.youtube.com/watch?v=gxtOTJcCkiU"}, {"level": "Beginners", "stepName": "Tiempo espania", "originalCount": "1", "type": "Free", "link": "https://www.youtube.com/watch?v=gxtOTJcCkiU"}, {"level": "Beginners", "stepName": "Enchufala Complicado", "originalCount": "3", "type": "Free", "link": "https://www.youtube.com/watch?v=Hq2OBXdCIfk"}, {"level": "Intermediate", "stepName": "Enchufala Coca Cola", "originalCount": "3", "type": "Free", "link": "https://www.youtube.com/watch?v=UgvhPi6y1JI"}, {"level": "Beginners", "stepName": "Vacilala", "originalCount": "2", "type": "Free", "link": "https://www.youtube.com/watch?v=9qvB4DV8gaM"}, {"level": "Beginners", "stepName": "Vacilala y Vuelta", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=jxiX4L4JMiw"}, {"level": "Beginners", "stepName": "Sombrero", "originalCount": "2", "type": "Free", "link": "https://www.youtube.com/watch?v=sAUeJyOy2nc"}, {"level": "Advanced", "stepName": "Sombrero Doble", "originalCount": "4", "type": "Free", "link": "https://www.youtube.com/watch?v=nLo6Jc_a8GI"}, {"level": "Intermediate", "stepName": "Siete Coca Cola", "originalCount": "2", "type": "Free", "link": "https://www.youtube.com/watch?v=5Xmq2FZS36w"}, {"level": "Intermediate", "stepName": "Prima con la Hermana", "originalCount": "3", "type": "Free", "link": "https://www.youtube.com/watch?v=b8DnNDZS7jA"}, {"level": "Intermediate", "stepName": "Setenta y Cinco", "originalCount": "3", "type": "Free", "link": "https://www.youtube.com/watch?v=mVj_A7PUdJg"}, {"level": "Beginners", "stepName": "Prima", "originalCount": "2", "type": "Free", "link": "https://www.youtube.com/watch?v=2bQfSw_lXfA"}, {"level": "Intermediate", "stepName": "Montana", "originalCount": "4", "type": "Free", "link": "https://www.youtube.com/watch?v=mKciEoZfqns"}, {"level": "Beginners", "stepName": "Miami", "originalCount": "2", "type": "Free", "link": "https://www.youtube.com/watch?v=U6WG7TWGEYA"}, {"level": "Beginners", "stepName": "Lento", "originalCount": "2", "type": "Free", "link": "https://www.youtube.com/watch?v=_SJbUn7-i6U"}, {"level": "Beginners", "stepName": "Kentucky", "originalCount": "3", "type": "Free", "link": "https://www.youtube.com/watch?v=hUjGh_ipsFc"}, {"level": "Advanced", "stepName": "Kentucky Sweater", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=72zJH9Ba4iU"}, {"level": "Beginners", "stepName": "Candado", "originalCount": "4", "type": "Free", "link": "https://www.youtube.com/watch?v=qIP_56dpgwU"}, {"level": "Advanced", "stepName": "Juana la Cubana", "originalCount": "5", "type": "Free", "link": "https://www.youtube.com/watch?v=AE_VT_ju9bs"}, {"level": "Intermediate", "stepName": "Havana", "originalCount": "6", "type": "Free", "link": "https://www.youtube.com/watch?v=UV6JKbHS0IE"}, {"level": "Intermediate", "stepName": "Flamenco", "originalCount": "3", "type": "Free", "link": "https://www.youtube.com/watch?v=xFoHM96t03o"}, {"level": "Beginners", "stepName": "Enchufla", "originalCount": "2", "type": "Free", "link": "https://www.youtube.com/watch?v=CRriCdGAWSw"}, {"level": "Beginners", "stepName": "Enchufla Doble", "originalCount": "3", "type": "Free", "link": "https://www.youtube.com/watch?v=8C-rnq2XEDQ"}, {"level": "Beginners", "stepName": "Exhibela", "originalCount": "1", "type": "Free", "link": "https://www.youtube.com/watch?v=mRFTUrbHAUU"}, {"level": "Intermediate", "stepName": "Enchufla con Exibala Doble", "originalCount": "", "type": "Free", "link": "https://www.youtube.com/watch?v=PzIPvX_CwmA"}, {"level": "Intermediate", "stepName": "Dedo", "originalCount": "4", "type": "Free", "link": "https://www.youtube.com/watch?v=4tP4hCu_GNY"}, {"level": "Intermediate", "stepName": "Beso", "originalCount": "4", "type": "Free", "link": "https://www.youtube.com/watch?v=J5WPB1ilHig"}, {"level": "Intermediate", "stepName": "Balsero", "originalCount": "4", "type": "Free", "link": "https://www.youtube.com/watch?v=_5_XGNUpg3s"}];

// ─── CSV Parser ───
// Full CSV parser: handles quoted cells, escaped quotes and line breaks inside cells
function parseCSVRows(csv) {
  const rows = []; let row = [], cur = '', inQ = false;
  for (let i = 0; i < csv.length; i++) {
    const ch = csv[i];
    if (inQ) {
      if (ch === '"') { if (csv[i+1] === '"') { cur += '"'; i++; } else inQ = false; }
      else cur += ch;
    } else if (ch === '"') inQ = true;
    else if (ch === ',') { row.push(cur.trim()); cur = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && csv[i+1] === '\n') i++;
      row.push(cur.trim()); rows.push(row); row = []; cur = '';
    } else cur += ch;
  }
  if (cur || row.length) { row.push(cur.trim()); rows.push(row); }
  return rows;
}
// A cell may hold several links (separated by spaces, new lines, "|" or ";")
function extractLinks(...cells) {
  return cells.flatMap(c => (c||'').split(/[\s|;]+/)).map(l => l.trim()).filter(l => /^https?:\/\//i.test(l));
}
function parseCSV(csv) {
  const rows = parseCSVRows(csv);
  if (rows.length <= 1) return [];
  return rows.slice(1).map(c => {
    if (c.length < 4) return null;
    // Column E and any extra columns (F, G, ...) may hold video links
    return { level:c[0]||'Unknown', stepName:c[1]||'', originalCount:c[2]||'', type:c[3]||'Unknown', links:extractLinks(...c.slice(4)) };
  }).filter(s => s && s.stepName);
}
// Rows with the same name + level + type become one step with all their videos
function mergeSteps(rows) {
  const map = new Map();
  rows.forEach(r => {
    const links = r.links || extractLinks(r.link);
    const key = `${r.stepName.trim().toLowerCase()}|${r.level}|${r.type}`;
    const ex = map.get(key);
    if (!ex) { map.set(key, { ...r, links:[...new Set(links)] }); return; }
    links.forEach(l => { if (!ex.links.includes(l)) ex.links.push(l); });
    if (!ex.originalCount && r.originalCount) ex.originalCount = r.originalCount;
  });
  return [...map.values()].map(s => ({ ...s, link: s.links[0] || '' }));
}

// ─── YouTube helpers ───
function ytId(url) {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}
function ytThumb(url) { const id = ytId(url); return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null; }

// ─── Google Drive helpers ───
function driveId(url) {
  if (!url) return null;
  const m = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:[^#]*&)?id=)([a-zA-Z0-9_-]{20,})/);
  return m ? m[1] : null;
}
function videoThumb(url) {
  const yt = ytThumb(url); if (yt) return yt;
  const d = driveId(url); return d ? `https://lh3.googleusercontent.com/d/${d}=w480` : null;
}
function embedUrl(url) {
  const yt = ytId(url); if (yt) return `https://www.youtube.com/embed/${yt}?autoplay=1&rel=0`;
  const d = driveId(url); return d ? `https://drive.google.com/file/d/${d}/preview` : null;
}

// ─── Config ───
const LEVEL_ORDER = ['Beginners','Intermediate','Advanced'];
const LC = {
  Beginners:    { color:'#22c55e', icon:'🌱', label:'מתחילים' },
  Intermediate: { color:'#f59e0b', icon:'🔥', label:'בינוניים' },
  Advanced:     { color:'#ef4444', icon:'⚡', label:'מתקדמים' },
};
const TC = {
  Free:                { color:'#a78bfa', label:'Free' },
  Rueda:               { color:'#f472b6', label:'Rueda' },
  'Tiempo espania':    { color:'#fb923c', label:'Tiempo España' },
  'Hombres el centro': { color:'#38bdf8', label:'Hombres el Centro' },
};

// ─── VideoModal ───
function VideoModal({ step, onClose }) {
  const [cur, setCur] = useState(0);
  const links = step.links || [];
  const link = links[cur] || '';
  const src = embedUrl(link);
  const isDrive = !ytId(link) && !!driveId(link);
  useEffect(() => {
    const h = e => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', h);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', h); };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(0,0,0,.88)',backdropFilter:'blur(8px)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
      <div onClick={e=>e.stopPropagation()} style={{background:'#111827',borderRadius:20,width:'100%',maxWidth:780,padding:24,position:'relative',border:'1px solid #1f2937',direction:'rtl',maxHeight:'90vh',overflowY:'auto'}}>
        <button onClick={onClose} style={{position:'absolute',top:14,left:14,background:'#374151',border:'none',color:'#fff',width:34,height:34,borderRadius:'50%',cursor:'pointer',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center',zIndex:10}}>✕</button>
        <h2 style={{fontSize:22,fontWeight:700,color:'#f3f4f6',marginBottom:10,paddingLeft:44}}>{step.stepName}</h2>
        <div style={{display:'flex',gap:7,marginBottom:16,flexWrap:'wrap'}}>
          <span style={{padding:'4px 11px',borderRadius:10,fontSize:12,color:'#fff',fontWeight:600,backgroundColor:LC[step.level]?.color||'#6b7280'}}>{LC[step.level]?.icon} {LC[step.level]?.label||step.level}</span>
          <span style={{padding:'4px 11px',borderRadius:10,fontSize:12,color:'#fff',fontWeight:600,backgroundColor:TC[step.type]?.color||'#6b7280'}}>{TC[step.type]?.label||step.type}</span>
          {step.originalCount && <span style={{padding:'4px 11px',borderRadius:10,fontSize:12,color:'#fff',fontWeight:600,backgroundColor:'#374151'}}>ספירה: {step.originalCount}</span>}
        </div>
        {links.length > 1 && (
          <div style={{display:'flex',gap:8,marginBottom:12,flexWrap:'wrap'}}>
            {links.map((l,i) => {
              const a = i===cur;
              return <button key={l} onClick={()=>setCur(i)} style={{padding:'6px 14px',fontSize:13,fontFamily:"'Heebo',sans-serif",borderRadius:10,cursor:'pointer',border:'1px solid',fontWeight:a?700:400,
                backgroundColor:a?'#e11d48':'transparent',color:a?'#fff':'#d1d5db',borderColor:a?'#e11d48':'#374151',transition:'all .2s'}}>🎬 סרטון {i+1}</button>;
            })}
          </div>
        )}
        {src ? (
          <div style={{position:'relative',width:'100%',paddingTop:'56.25%',borderRadius:12,overflow:'hidden',background:'#000'}}>
            <iframe key={src} src={src} title={step.stepName} style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',border:'none'}} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
          </div>
        ) : link ? (
          <div style={{padding:40,textAlign:'center',background:'#1f2937',borderRadius:12}}>
            <p style={{color:'#d1d5db',marginBottom:16}}>לא ניתן להטמיע את הסרטון</p>
            <a href={link} target="_blank" rel="noopener noreferrer" style={{color:'#f472b6',fontSize:15,textDecoration:'none',padding:'8px 20px',border:'1px solid #f472b6',borderRadius:10,display:'inline-block'}}>פתח בחלון חדש ↗</a>
          </div>
        ) : (
          <div style={{padding:40,textAlign:'center',background:'#1f2937',borderRadius:12}}><p style={{color:'#9ca3af'}}>אין סרטון זמין לצעד זה</p></div>
        )}
        {link && src && <a href={link} target="_blank" rel="noopener noreferrer" style={{display:'block',textAlign:'center',marginTop:12,color:'#9ca3af',fontSize:13,textDecoration:'none'}}>{isDrive ? 'צפה ב-Google Drive ↗' : 'צפה ב-YouTube ↗'}</a>}
      </div>
    </div>
  );
}

// ─── StepCard ───
function StepCard({ step, onPlay, idx }) {
  const [imgOk, setImgOk] = useState(false);
  const [hov, setHov] = useState(false);
  const thumb = videoThumb(step.link);
  const lc = LC[step.level]||{color:'#6b7280',icon:'•',label:step.level};
  const tc = TC[step.type]||{color:'#6b7280',label:step.type};

  const speak = e => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(step.stepName);
      u.lang = 'es-ES'; u.rate = 0.8;
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div
      onClick={() => onPlay(step)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="card-anim"
      style={{
        background:'#111827',borderRadius:14,overflow:'hidden',cursor:'pointer',
        transition:'all .25s cubic-bezier(.4,0,.2,1)',border:'1px solid',
        borderColor: hov ? lc.color+'66' : '#1f293788',
        transform: hov ? 'translateY(-6px) scale(1.02)' : 'none',
        boxShadow: hov ? `0 16px 48px rgba(0,0,0,.5), 0 0 0 1px ${lc.color}44` : '0 2px 12px rgba(0,0,0,.3)',
        animationDelay: `${Math.min(idx,20)*40}ms`,
      }}
    >
      {/* Thumbnail */}
      <div style={{position:'relative',width:'100%',aspectRatio:'16/9',background:'#0f172a',overflow:'hidden'}}>
        {thumb ? (
          <>
            {!imgOk && <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:36,background:'linear-gradient(135deg,#1f2937,#111827)'}}>🎬</div>}
            <img src={thumb} alt={step.stepName} referrerPolicy="no-referrer" style={{width:'100%',height:'100%',objectFit:'cover',transition:'opacity .3s',opacity:imgOk?1:0}} onLoad={()=>setImgOk(true)} />
            <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,.35)',transition:'opacity .25s',opacity:hov?1:0.5}}>
              <div style={{width:44,height:44,borderRadius:'50%',background:'rgba(225,29,72,.9)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,color:'#fff',paddingLeft:3,boxShadow:'0 4px 16px rgba(225,29,72,.4)'}}>▶</div>
            </div>
          </>
        ) : (
          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:36,background:`linear-gradient(135deg,${lc.color}22,#111827)`}}>💃</div>
        )}
        <div style={{position:'absolute',top:8,right:8,padding:'3px 10px',borderRadius:8,fontSize:11,fontWeight:700,color:'#fff',backgroundColor:lc.color,zIndex:2}}>{lc.icon} {lc.label}</div>
      </div>
      {/* Body */}
      <div style={{padding:'12px 14px 14px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
          <h3 style={{fontSize:16,fontWeight:600,color:'#f3f4f6',flex:1,lineHeight:1.3}}>{step.stepName}</h3>
          <button onClick={speak} title="הקרא בספרדית" style={{background:'#1f2937',border:'1px solid #374151',borderRadius:'50%',width:34,height:34,cursor:'pointer',fontSize:15,display:'flex',alignItems:'center',justifyContent:'center',marginRight:8,flexShrink:0}}>🔊</button>
        </div>
        <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
          <span style={{padding:'2px 9px',fontSize:11,borderRadius:10,fontWeight:500,border:'1px solid',backgroundColor:`${tc.color}18`,color:tc.color,borderColor:`${tc.color}44`}}>{tc.label}</span>
          {step.originalCount && <span style={{padding:'2px 9px',fontSize:11,borderRadius:10,fontWeight:400,backgroundColor:'#1f293722',color:'#9ca3af',border:'1px solid #37415133'}}>{step.originalCount} counts</span>}
          {step.links?.length > 1 && <span style={{padding:'2px 9px',fontSize:11,borderRadius:10,fontWeight:600,border:'1px solid',backgroundColor:'#e11d4818',color:'#fb7185',borderColor:'#e11d4844'}}>🎬 {step.links.length} סרטונים</span>}
          {!step.link && <span style={{padding:'2px 9px',fontSize:11,borderRadius:10,fontWeight:500,border:'1px solid',backgroundColor:'#7f1d1d33',color:'#fca5a5',borderColor:'#7f1d1d55'}}>אין וידאו</span>}
        </div>
      </div>
    </div>
  );
}

// ─── Main App ───
export default function SalsaApp() {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [src, setSrc] = useState('');
  const [search, setSearch] = useState('');
  const [lvl, setLvl] = useState('All');
  const [typ, setTyp] = useState('All');
  const [vid, setVid] = useState(null);
  const [showTop, setShowTop] = useState(false);
  const sRef = useRef(null);

  useEffect(() => { load(); }, []);
  useEffect(() => {
    const h = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  useEffect(() => {
    const h = e => {
      if ((e.ctrlKey && e.key==='k') || (e.key==='/' && e.target.tagName!=='INPUT')) {
        e.preventDefault(); sRef.current?.focus();
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  async function load() {
    setLoading(true);
    try {
      const r = await fetch(CSV_URL);
      if (!r.ok) throw new Error('HTTP '+r.status);
      const csv = await r.text();
      if (csv.length < 50) throw new Error('Short');
      const p = parseCSV(csv);
      if (p.length === 0) throw new Error('Empty');
      setSteps(mergeSteps(p)); setSrc('live');
    } catch {
      setSteps(mergeSteps(EMBEDDED_DATA)); setSrc('embedded');
    } finally { setLoading(false); }
  }

  const levels = useMemo(() => {
    const f = [...new Set(steps.map(s=>s.level))];
    return ['All', ...LEVEL_ORDER.filter(l=>f.includes(l)), ...f.filter(l=>!LEVEL_ORDER.includes(l))];
  }, [steps]);
  const types = useMemo(() => ['All', ...new Set(steps.map(s=>s.type))], [steps]);

  const filtered = useMemo(() => steps.filter(s => {
    const ms = !search || s.stepName.toLowerCase().includes(search.toLowerCase()) || s.type.toLowerCase().includes(search.toLowerCase());
    return ms && (lvl==='All'||s.level===lvl) && (typ==='All'||s.type===typ);
  }), [steps, search, lvl, typ]);

  const grouped = useMemo(() => {
    const g = {}; filtered.forEach(s => { if(!g[s.level])g[s.level]=[]; g[s.level].push(s); });
    const sorted = {}; LEVEL_ORDER.forEach(l=>{if(g[l])sorted[l]=g[l];}); Object.keys(g).forEach(l=>{if(!sorted[l])sorted[l]=g[l];});
    return sorted;
  }, [filtered]);

  if (loading) return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh',background:'#0a0a0a'}}>
      <style>{CSS}</style>
      <img src="/icon.png" alt="Salsa" style={{width:100,height:100,borderRadius:20,marginBottom:20,animation:'pulse 1.5s ease infinite'}} />
      <div style={{width:40,height:40,border:'3px solid #1f2937',borderTopColor:'#e11d48',borderRadius:'50%',animation:'spin .7s linear infinite'}} />
      <p style={{color:'#9ca3af',fontSize:17,marginTop:16}}>טוען צעדי סלסה...</p>
    </div>
  );

  const hasFilters = search || lvl!=='All' || typ!=='All';

  return (
    <div style={{fontFamily:"'Heebo',sans-serif",background:'#0a0a0a',minHeight:'100vh',direction:'rtl',color:'#e5e7eb'}}>
      <style>{CSS}</style>

      {/* Hero */}
      <header style={{position:'relative',overflow:'hidden',padding:'20px 24px 24px',textAlign:'center',background:'linear-gradient(135deg,#0a0a0a,#1a0a1a 30%,#1a0f0a 70%,#0a0a0a)',backgroundSize:'300% 300%',animation:'gradBG 12s ease infinite'}}>
        <div style={{position:'absolute',top:'-40%',left:'50%',transform:'translateX(-50%)',width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(225,29,72,.1),rgba(249,115,22,.05) 50%,transparent 70%)',pointerEvents:'none'}} />
        {/* Related site icons - top row */}
        <div style={{display:'flex',gap:10,marginBottom:16,position:'relative',zIndex:2}}>
          {[
            { href:'https://media-noche-karmiel.vercel.app', img:'/media-noche-logo.png', title:'Media Noche Salsa' },
            { href:'https://avnerman.vercel.app/', img:'/embarking.png', title:'Avner Man' },
          ].map(({href,img,title}) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" title={title}
              style={{display:'block',width:56,height:56,borderRadius:12,overflow:'hidden',border:'2px solid #374151',boxShadow:'0 4px 16px rgba(0,0,0,.4)',transition:'all .2s',flexShrink:0}}
              onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.1)';e.currentTarget.style.borderColor='#6b7280';}}
              onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.borderColor='#374151';}}
            >
              <img src={img} alt={title} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} />
            </a>
          ))}
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:16,position:'relative',zIndex:1,marginBottom:12}}>
          <img src="/icon.png" alt="Salsa Steps Catalog" style={{width:72,height:72,borderRadius:16,boxShadow:'0 8px 32px rgba(225,29,72,.3)'}} />
          <div>
            <h1 style={{fontSize:'clamp(24px,4.5vw,42px)',fontWeight:900,color:'#fff',letterSpacing:'-.5px'}}>Salsa Steps Catalog</h1>
            <p style={{fontSize:15,color:'#f97316',fontWeight:500,marginTop:2}}>by Avner Man</p>
          </div>
        </div>
        <p style={{fontSize:17,color:'#d1d5db',fontWeight:300,position:'relative',zIndex:1}}>חפש, סנן והפעל סרטוני הדגמה ל-{steps.length} צעדי סלסה ורואדה</p>
        {src==='embedded' && (
          <div style={{marginTop:12,padding:'6px 16px',backgroundColor:'#1c1917',borderRadius:8,fontSize:13,color:'#a8a29e',display:'inline-flex',alignItems:'center',gap:6}}>
            📦 נתונים מקומיים | <button onClick={load} style={{background:'none',border:'none',color:'#f97316',cursor:'pointer',fontSize:13,textDecoration:'underline',fontFamily:"'Heebo',sans-serif"}}>נסה לרענן ↻</button>
          </div>
        )}
      </header>

      {/* Controls */}
      <div style={{position:'sticky',top:0,zIndex:50,background:'rgba(10,10,10,.94)',backdropFilter:'blur(20px)',padding:'14px 24px 10px',borderBottom:'1px solid #1f2937'}}>
        <div style={{position:'relative',maxWidth:560,margin:'0 auto 10px'}}>
          <span style={{position:'absolute',right:16,top:'50%',transform:'translateY(-50%)',fontSize:17,pointerEvents:'none'}}>🔍</span>
          <input ref={sRef} type="text" placeholder='חפש צעד... (לחץ "/" למיקוד)' value={search} onChange={e=>setSearch(e.target.value)}
            style={{width:'100%',padding:'12px 48px 12px 40px',fontSize:16,fontFamily:"'Heebo',sans-serif",background:'#111827',border:'2px solid #374151',borderRadius:14,color:'#fff',outline:'none',direction:'rtl'}} />
          {search && <button onClick={()=>setSearch('')} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',background:'#374151',border:'none',color:'#9ca3af',width:26,height:26,borderRadius:'50%',cursor:'pointer',fontSize:13,display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>}
        </div>
        {/* Level filter */}
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6,flexWrap:'wrap',justifyContent:'center'}}>
          <span style={{fontSize:13,color:'#6b7280',fontWeight:500,minWidth:32}}>רמה:</span>
          <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
            {levels.map(l => {
              const c = LC[l]; const a = lvl===l;
              return <button key={l} onClick={()=>setLvl(l)} style={{padding:'5px 13px',fontSize:13,fontFamily:"'Heebo',sans-serif",border:'1px solid',borderRadius:20,cursor:'pointer',whiteSpace:'nowrap',
                backgroundColor:a?(c?.color||'#e11d48'):'transparent', color:a?'#fff':(c?.color||'#d1d5db'), borderColor:a?(c?.color||'#e11d48'):'#374151', fontWeight:a?700:400, transition:'all .2s'
              }}>{c?.icon||'🎯'} {l==='All'?'הכל':c?.label||l}</button>;
            })}
          </div>
        </div>
        {/* Type filter */}
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6,flexWrap:'wrap',justifyContent:'center'}}>
          <span style={{fontSize:13,color:'#6b7280',fontWeight:500,minWidth:32}}>סוג:</span>
          <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
            {types.map(t => {
              const c = TC[t]; const a = typ===t;
              return <button key={t} onClick={()=>setTyp(t)} style={{padding:'5px 13px',fontSize:13,fontFamily:"'Heebo',sans-serif",border:'1px solid',borderRadius:20,cursor:'pointer',whiteSpace:'nowrap',
                backgroundColor:a?(c?.color||'#e11d48'):'transparent', color:a?'#fff':(c?.color||'#d1d5db'), borderColor:a?(c?.color||'#e11d48'):'#374151', fontWeight:a?700:400, transition:'all .2s'
              }}>{t==='All'?'🎯 הכל':c?.label||t}</button>;
            })}
          </div>
        </div>
        <div style={{textAlign:'center',fontSize:13,color:'#6b7280',marginTop:6,display:'flex',alignItems:'center',justifyContent:'center',gap:10}}>
          <span>{filtered.length} צעדים מתוך {steps.length}</span>
          {hasFilters && <button onClick={()=>{setSearch('');setLvl('All');setTyp('All');}} style={{background:'#374151',color:'#d1d5db',border:'none',padding:'3px 10px',borderRadius:8,cursor:'pointer',fontSize:12,fontFamily:"'Heebo',sans-serif"}}>נקה הכל ✕</button>}
        </div>
      </div>

      {/* Content */}
      <main style={{maxWidth:1200,margin:'0 auto',padding:'20px 20px 80px'}}>
        {filtered.length === 0 ? (
          <div style={{textAlign:'center',padding:'80px 20px'}}>
            <span style={{fontSize:56}}>🕺</span>
            <p style={{color:'#9ca3af',fontSize:18,marginTop:16}}>לא נמצאו צעדים. נסה חיפוש אחר.</p>
          </div>
        ) : lvl==='All' ? (
          Object.entries(grouped).map(([level, ls]) => {
            const c = LC[level]||{color:'#6b7280',icon:'•',label:level};
            return (
              <section key={level} style={{marginBottom:36}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
                  <div style={{width:10,height:10,borderRadius:'50%',backgroundColor:c.color,boxShadow:`0 0 12px ${c.color}66`,flexShrink:0}} />
                  <h2 style={{fontSize:22,fontWeight:700,color:c.color,whiteSpace:'nowrap'}}>{c.icon} {c.label||level}</h2>
                  <span style={{fontSize:13,color:'#6b7280',whiteSpace:'nowrap'}}>{ls.length} צעדים</span>
                  <div style={{flex:1,height:1,backgroundColor:'#1f2937',marginRight:16}} />
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:14}}>
                  {ls.map((s,i) => <StepCard key={`${s.stepName}-${i}`} step={s} onPlay={setVid} idx={i} />)}
                </div>
              </section>
            );
          })
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:14}}>
            {filtered.map((s,i) => <StepCard key={`${s.stepName}-${i}`} step={s} onPlay={setVid} idx={i} />)}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{textAlign:'center',padding:'28px 24px',borderTop:'1px solid #1f2937',color:'#9ca3af',fontSize:14}}>
        <img src="/icon.png" alt="" style={{width:40,height:40,borderRadius:10,marginBottom:8}} />
        <p style={{fontWeight:600}}>Salsa Steps Catalog © {new Date().getFullYear()} Avner Man</p>
        <p style={{fontSize:13,color:'#6b7280',marginTop:4}}>נתונים מ-Google Sheets | {steps.length} צעדים | נבנה עם ❤️</p>
        <a href="https://vercel.com/manavner-9849s-projects/salsa-steps-web/analytics" target="_blank" rel="noopener noreferrer"
          style={{display:'inline-flex',alignItems:'center',gap:6,marginTop:14,padding:'7px 16px',borderRadius:20,border:'1px solid #374151',color:'#9ca3af',fontSize:12,textDecoration:'none',background:'#111827',transition:'all .2s'}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor='#6b7280';e.currentTarget.style.color='#f3f4f6';}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor='#374151';e.currentTarget.style.color='#9ca3af';}}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
          Vercel Analytics
        </a>
      </footer>

      {showTop && <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} style={{position:'fixed',bottom:20,left:20,width:44,height:44,borderRadius:'50%',background:'linear-gradient(135deg,#e11d48,#f97316)',color:'#fff',border:'none',cursor:'pointer',fontSize:20,fontWeight:700,boxShadow:'0 4px 20px rgba(225,29,72,.4)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center'}}>↑</button>}

      {vid && <VideoModal step={vid} onClose={()=>setVid(null)} />}
    </div>
  );
}

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
@keyframes fadeInUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes gradBG{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
.card-anim{animation:fadeInUp .45s ease both}
input::placeholder{color:#6b7280}
::-webkit-scrollbar{width:6px}
::-webkit-scrollbar-track{background:#0a0a0a}
::-webkit-scrollbar-thumb{background:#333;border-radius:3px}
`;
