import { HardDrive } from "lucide-react";
import type { Part } from "../types/part";
import { money } from "../data/parts";

type ProductGridProps = {
  items: Part[];
  togglePart: (id: number) => void;
  selected: number[];
};

export default function ProductGrid({ items, togglePart, selected }: ProductGridProps) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <HardDrive size={26} />
        <p>По такому запросу ничего не найдено.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {items.map((part) => (
        <article className="product-card" key={part.id}>
          <div className="product-image-wrap">
            <img src={part.image} alt={part.name} loading="lazy" />
          </div>
          <div className="product-card-body">
            <span className="muted">{part.category}</span>
            <h3>{part.name}</h3>
            <p>{part.description}</p>
            <div className="product-card-bottom">
              <strong className="price">{money(part.price)}</strong>
              <button
                className={selected.includes(part.id) ? "button button-selected" : "button button-red"}
                onClick={() => togglePart(part.id)}
              >
                {selected.includes(part.id) ? "Добавлено" : "Добавить"}
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
