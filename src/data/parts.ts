import type { Part } from "../types/part";

export const parts: Part[] = [
  { id: 1, name: "AMD Ryzen 7", category: "Процессоры", price: 28990, image: "/images/processors/10images.jpg", description: "Для игровых и рабочих сборок" },
  { id: 2, name: "Intel Core", category: "Процессоры", price: 24990, image: "/images/processors/9images.jpg", description: "Процессор для повседневных задач" },
  { id: 3, name: "Материнская плата ATX", category: "Материнские платы", price: 18990, image: "/images/motherboards/12images.jpg", description: "Формат ATX" },
  { id: 4, name: "Видеокарта GeForce", category: "Видеокарты", price: 69990, image: "/images/gpu/22images.jpg", description: "Для современных игр" },
  { id: 5, name: "Оперативная память DDR5", category: "Оперативная память", price: 11990, image: "/images/ram/1images.jpg", description: "Комплект модулей памяти" },
  { id: 6, name: "SSD M.2", category: "Накопители", price: 7990, image: "/images/storage/17images.jpg", description: "Быстрый накопитель" },
  { id: 7, name: "Корпус с боковым стеклом", category: "Корпуса", price: 9990, image: "/images/cases/18images.jpg", description: "Тёмный корпус для игровой сборки" },
  { id: 8, name: "Блок питания", category: "Блоки питания", price: 10990, image: "/images/psu/3images.jpg", description: "Питание для комплектующих" },
  { id: 9, name: "Система охлаждения", category: "Охлаждение", price: 8990, image: "/images/cooling/20images.jpg", description: "Охлаждение процессора" },
];

export const categories = ["Все", ...Array.from(new Set(parts.map((part) => part.category)))];

export const money = (value: number) => `${value.toLocaleString("ru-RU")} ₽`;
