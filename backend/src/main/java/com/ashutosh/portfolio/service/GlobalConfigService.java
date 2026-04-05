package com.ashutosh.portfolio.service;

import com.ashutosh.portfolio.model.GlobalConfig;
import com.ashutosh.portfolio.repository.GlobalConfigRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class GlobalConfigService {

    private final GlobalConfigRepository globalConfigRepository;

    public GlobalConfigService(GlobalConfigRepository globalConfigRepository) {
        this.globalConfigRepository = globalConfigRepository;
    }

    public Map<String, String> getAllConfig() {
        return globalConfigRepository.findAll().stream()
                .collect(java.util.HashMap::new, (m, v) -> {
                    if (v.getKey() != null) {
                        m.put(v.getKey(), v.getValue() != null ? v.getValue() : "");
                    }
                }, java.util.HashMap::putAll);
    }

    public String getConfigValue(String key, String defaultValue) {
        return globalConfigRepository.findByKey(key)
                .map(GlobalConfig::getValue)
                .orElse(defaultValue);
    }

    public GlobalConfig saveConfig(GlobalConfig config) {
        return globalConfigRepository.findByKey(config.getKey())
                .map(existing -> {
                    existing.setValue(config.getValue());
                    existing.setDescription(config.getDescription());
                    return globalConfigRepository.save(existing);
                })
                .orElseGet(() -> globalConfigRepository.save(config));
    }

    public void saveAll(List<GlobalConfig> configs) {
        globalConfigRepository.saveAll(configs);
    }
}
