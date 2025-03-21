-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 21-Mar-2025 às 19:03
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `crud_restaurante`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `nome_cliente` varchar(100) NOT NULL,
  `telefone` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `nome_cliente`, `telefone`, `email`) VALUES
(1, 'Ana Silva Costa', '(11) 98765-0000', 'ana.costa@email.com'),
(2, 'Ana Silva', '(11) 98765-4321', 'ana@email.com');

-- --------------------------------------------------------

--
-- Estrutura da tabela `itens_pedido`
--

CREATE TABLE `itens_pedido` (
  `id_item_pedido` int(11) NOT NULL,
  `id_pedido` int(11) DEFAULT NULL,
  `id_prato` int(11) DEFAULT NULL,
  `quantidade` int(11) NOT NULL,
  `preco_unitario` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `itens_pedido`
--

INSERT INTO `itens_pedido` (`id_item_pedido`, `id_pedido`, `id_prato`, `quantidade`, `preco_unitario`) VALUES
(1, 1, 1, 2, '49.90'),
(2, 3, 1, 2, '42.90'),
(3, 3, 2, 1, '25.50');

-- --------------------------------------------------------

--
-- Estrutura da tabela `mesas`
--

CREATE TABLE `mesas` (
  `id_mesa` int(11) NOT NULL,
  `numero_mesa` int(11) NOT NULL,
  `capacidade` int(11) NOT NULL,
  `disponivel` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `mesas`
--

INSERT INTO `mesas` (`id_mesa`, `numero_mesa`, `capacidade`, `disponivel`) VALUES
(1, 5, 4, 0),
(3, 77, 4, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `id_mesa` int(11) DEFAULT NULL,
  `data_pedido` datetime DEFAULT current_timestamp(),
  `status_pedido` enum('pendente','em_andamento','concluido','cancelado') DEFAULT 'pendente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `pedidos`
--

INSERT INTO `pedidos` (`id_pedido`, `id_cliente`, `id_mesa`, `data_pedido`, `status_pedido`) VALUES
(1, 1, 1, '2025-03-21 13:45:44', 'pendente'),
(3, 1, 1, '2025-03-21 14:54:58', 'pendente');

-- --------------------------------------------------------

--
-- Estrutura da tabela `pratos`
--

CREATE TABLE `pratos` (
  `id_prato` int(11) NOT NULL,
  `nome_prato` varchar(100) NOT NULL,
  `descricao` text DEFAULT NULL,
  `imagem` varchar(255) DEFAULT NULL,
  `preco` decimal(10,2) NOT NULL,
  `disponivel` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `pratos`
--

INSERT INTO `pratos` (`id_prato`, `nome_prato`, `descricao`, `imagem`, `preco`, `disponivel`) VALUES
(1, 'Spaghetti Carbonara Premium', 'Massa italiana com molho cremoso, queijo parmesão e bacon defumado.', NULL, '49.90', 1),
(2, 'Spaghetti Carbonara', 'Massa italiana com molho cremoso de ovos, queijo parmesão e bacon.', 'carbonara.jpg', '42.90', 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Índices para tabela `itens_pedido`
--
ALTER TABLE `itens_pedido`
  ADD PRIMARY KEY (`id_item_pedido`),
  ADD KEY `id_pedido` (`id_pedido`),
  ADD KEY `id_prato` (`id_prato`);

--
-- Índices para tabela `mesas`
--
ALTER TABLE `mesas`
  ADD PRIMARY KEY (`id_mesa`),
  ADD UNIQUE KEY `numero_mesa` (`numero_mesa`);

--
-- Índices para tabela `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_mesa` (`id_mesa`);

--
-- Índices para tabela `pratos`
--
ALTER TABLE `pratos`
  ADD PRIMARY KEY (`id_prato`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `itens_pedido`
--
ALTER TABLE `itens_pedido`
  MODIFY `id_item_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `mesas`
--
ALTER TABLE `mesas`
  MODIFY `id_mesa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `pratos`
--
ALTER TABLE `pratos`
  MODIFY `id_prato` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `itens_pedido`
--
ALTER TABLE `itens_pedido`
  ADD CONSTRAINT `itens_pedido_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`),
  ADD CONSTRAINT `itens_pedido_ibfk_2` FOREIGN KEY (`id_prato`) REFERENCES `pratos` (`id_prato`);

--
-- Limitadores para a tabela `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  ADD CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`id_mesa`) REFERENCES `mesas` (`id_mesa`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
