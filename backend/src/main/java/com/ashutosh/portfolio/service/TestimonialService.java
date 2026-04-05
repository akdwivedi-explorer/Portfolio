package com.ashutosh.portfolio.service;

import com.ashutosh.portfolio.model.Testimonial;
import com.ashutosh.portfolio.repository.TestimonialRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class TestimonialService {

    private final TestimonialRepository testimonialRepository;

    public TestimonialService(TestimonialRepository testimonialRepository) {
        this.testimonialRepository = testimonialRepository;
    }

    public List<Testimonial> getAllTestimonials() {
        return testimonialRepository.findAllByOrderByDisplayOrderAsc();
    }

    @Transactional
    public Testimonial saveTestimonial(Testimonial testimonial) {
        return testimonialRepository.save(testimonial);
    }

    @Transactional
    public void deleteTestimonial(Long id) {
        testimonialRepository.deleteById(id);
    }
}
