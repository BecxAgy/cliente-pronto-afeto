'use client';

import React, { useState, useEffect } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/shared/modules/components/ui/popover';
import { Button } from '@/src/shared/modules/components/ui/button';
import { Filter, X } from 'lucide-react';
import { RatingGroup } from '@/src/shared/modules/components/ui/rating-group';
import { Input } from '@/src/shared/modules/components/ui/input';
import { Label } from '@/src/shared/modules/components/ui/label';
import { Checkbox } from '@/src/shared/modules/components/ui/checkbox';
import { getAllSkills } from '@/src/shared/modules/actions/patology.actions';
import { Skill } from '@/src/shared/modules/types/patology.types';
import { CaregiverFilters } from '../types/filters.types';

interface ButtonFilterComponentProps {
  readonly onFilterChange?: (filters: CaregiverFilters) => void;
}

function ButtonFilterComponent({ onFilterChange }: ButtonFilterComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(false);

  // Estados dos filtros
  const [selectedRating, setSelectedRating] = useState<string>('0');
  const [experience, setExperience] = useState<string>('');
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);

  // Carrega as habilidades quando o popover abre
  useEffect(() => {
    if (isOpen && skills.length === 0) {
      const loadSkills = async () => {
        setIsLoadingSkills(true);
        const response = await getAllSkills();
        console.log('🚀 ~ loadSkills ~ response:', response);
        if (!response.error && response.data) {
          setSkills(response.data.content);
        }
        setIsLoadingSkills(false);
      };
      loadSkills();
    }
  }, [isOpen, skills.length]);

  const handleSkillToggle = (skillId: number) => {
    setSelectedSkills(prev =>
      prev.includes(skillId)
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleApplyFilters = () => {
    const filters: CaregiverFilters = {};

    if (selectedRating !== '0') {
      filters.avaliacoes = Number.parseInt(selectedRating, 10);
    }

    if (experience) {
      filters.expercience = experience;
    }

    if (selectedSkills.length > 0) {
      filters.habilidadesSelecionadas = selectedSkills;
    }

    onFilterChange?.(filters);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setSelectedRating('0');
    setExperience('');
    setSelectedSkills([]);
    onFilterChange?.({});
  };

  const hasActiveFilters =
    selectedRating !== '0' || experience !== '' || selectedSkills.length > 0;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="default" className="justify-between absolute end-0">
          <Filter className="mr-2 h-4 w-4" />
          Filtrar
          {hasActiveFilters && (
            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-background text-xs text-primary">
              {(selectedRating === '0' ? 0 : 1) +
                (experience ? 1 : 0) +
                (selectedSkills.length > 0 ? 1 : 0)}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h4 className="font-semibold text-lg">Filtros</h4>
              <p className="text-sm text-muted-foreground">
                Refine sua busca de cuidadores
              </p>
            </div>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="h-8 px-2"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Filtro de Avaliação */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Avaliação Mínima</Label>
            <div className="flex items-center gap-2">
              <RatingGroup
                value={selectedRating}
                onValueChange={setSelectedRating}
                max={5}
                size="default"
              />
              {selectedRating !== '0' && (
                <span className="text-sm text-muted-foreground">
                  {selectedRating}+
                </span>
              )}
            </div>
          </div>

          {/* Filtro de Experiência */}
          <div className="space-y-2">
            <Label htmlFor="experience" className="text-sm font-medium">
              Anos de Experiência (mínimo)
            </Label>
            <Input
              id="experience"
              type="number"
              min="0"
              placeholder="Ex: 5"
              value={experience}
              onChange={e => setExperience(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Filtro de Habilidades */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Habilidades</Label>
            {isLoadingSkills ? (
              <p className="text-sm text-muted-foreground">
                Carregando habilidades...
              </p>
            ) : (
              <div className="max-h-48 space-y-2 overflow-y-auto rounded-md border p-3">
                {skills.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Nenhuma habilidade disponível
                  </p>
                ) : (
                  skills.map(skill => (
                    <div key={skill.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`skill-${skill.id}`}
                        checked={selectedSkills.includes(skill.id)}
                        onCheckedChange={() => handleSkillToggle(skill.id)}
                      />
                      <label
                        htmlFor={`skill-${skill.id}`}
                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {skill.nome}
                      </label>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-2 border-t pt-3">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button onClick={handleApplyFilters} className="flex-1">
              Aplicar Filtros
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ButtonFilterComponent;
