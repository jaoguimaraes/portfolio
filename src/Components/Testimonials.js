import React from "react";
import "../Styles/Testimonials.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      className="testimonial-card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      <div className="testimonial-card__quote-icon">"</div>
      {testimonial.context && (
        <p className="testimonial-card__context">{testimonial.context}</p>
      )}
      <p className="testimonial-card__text">{testimonial.text}</p>
      <div className="testimonial-card__author">
        <div className="testimonial-card__avatar">
          {testimonial.photo
            ? <img src={testimonial.photo} alt={testimonial.name} />
            : <span>{testimonial.name.charAt(0)}</span>
          }
        </div>
        <div className="testimonial-card__info">
          <strong className="testimonial-card__name">{testimonial.name}</strong>
          <span className="testimonial-card__role">{testimonial.role}</span>
          {testimonial.company && (
            <span className="testimonial-card__company">{testimonial.company}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const { t } = useTranslation();
  const list = t("testimonials.list", { returnObjects: true });

  return (
    <div className="testimonials-container">
      <motion.div
        className="testimonials-header"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="testimonials-title">{t("testimonials.title")}</h2>
        <p className="testimonials-subtitle">{t("testimonials.subtitle")}</p>
      </motion.div>

      <div className="testimonials-grid">
        {list.map((testimonial, i) => (
          <TestimonialCard key={i} testimonial={testimonial} index={i} />
        ))}
      </div>
    </div>
  );
}
